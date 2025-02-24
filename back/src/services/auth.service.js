import { sign, verify } from 'hono/jwt';
import db from '../config/database.js';
import { sendPasswordResetEmail, sendVerificationEmail } from '../utils/email.js';
import { decodeToken, generateToken } from '../utils/jwt.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import env from '../config/env.js';


async function deleteUser(userId) {
  const query = 'DELETE FROM user WHERE id = ?';
  const result = db.prepare(query).run(userId);
  return result.changes > 0; // returns true if a user was deleted, false if no user was found
}

async function softDeleteUser(userId) {
  try {
    let today = new Date().toISOString();
    const query = `
      UPDATE user
      SET is_archived = ?, deleted_at = ?
      WHERE id = ?
    `;
    const values = [1, today, userId]
    const result = db.prepare(query).run(values);
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function findUserByEmail(email) {
  const query = 'SELECT * FROM user WHERE email = ?';
  const result = await db.prepare(query).get(email);

  return result;
}

async function createUser(data) {
  const query = `
    INSERT INTO user (email, password, firstname, lastname, address, zip, city, phone, role, verified)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [data.email, data.password, data.firstname,data.lastname,data.address, data.zip, data.city,
    data.phone, data.role, 0];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM user WHERE id = ?').get(result.lastInsertRowid);
}



async function updateUser(userId, data) {
  const setClauses = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    setClauses.push(`${key} = ?`);
    values.push(value);
  });
  values.push(userId);

  const query = `
    UPDATE user 
    SET ${setClauses.join(', ')}
    WHERE id = ?
  `;
  await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
}

async function register(data) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(data.password);
  data.password = hashedPassword;
  const user = await createUser(data);

  // Send verification email
  sendVerificationEmail(user.email);

  return user;
}

async function login(email, password) {
  const user = await findUserByEmail(email);
  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  if (!user.verified) throw new Error("user-not-verified");

  return generateToken(user);
}

async function verifyEmail(token) {
  try {
    const decodedToken = await decodeToken(token);
    console.log("decodedToken:", decodedToken);
    if (decodedToken == null) throw new Error("token couldn't be decoded");

    const user = await findUserByEmail(decodedToken.email);
    if (!user) throw new Error("User not found");

    const updatedUser = await updateUser(user.id, { verified: 1 });
    console.log("updatedUser:", updatedUser);
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function forgotPassword(email) {
  const user = await findUserByEmail(email);
  if (!user) {
    return true;
  }

  const resetToken = await sign(
    {
      id: user.id,
      email: user.email,
      type: "password-reset",
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    env.JWT_SECRET
  );

  // Store the reset token in the database
  await updateUser(user.id, {
    reset_token: resetToken
  });

  // Send password reset email
  await sendPasswordResetEmail(user.email, resetToken);

  return true;
}

async function resetPassword(token, newPassword) {
  // Verify token
  const decoded = await verify(token, env.JWT_SECRET);
  if (!decoded) {
    throw new Error("Invalid or expired reset token");
  }

  // Find user with valid reset token
  const user = await findUserByEmail(decoded.email);
  if (!user || user.reset_token !== token) {
    throw new Error("Invalid or expired reset token");
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);

  // Update user password and clear reset token
  await updateUser(user.id, {
    password: hashedPassword,
    reset_token: null
  });

  return true;
}

async function sendEmailVerification(email) {
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    throw new Error("User does not exist");
  }

  await sendVerificationEmail(email);
}


async function getAllUsers() {
  const query = 'SELECT id,firstname,lastname,email,address,zip,city,phone,role,verified,is_archived,created_at,updated_at,deleted_at FROM user';

  const result = await db.prepare(query).all();

  return result;

}

async function getUserDetail(id) {
  const query = `SELECT id,firstname,lastname,email,address,zip,city,phone,role,verified,is_archived,created_at,updated_at,deleted_at 
                FROM user WHERE id = ? `;
  const result = await db.prepare(query).get(id);
  return result;
}

async function update(userId, data) {
  let today = new Date().toISOString();
  const setClauses = [];
  const values = [];
  function camelToSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
  Object.entries(data).forEach(([key, value]) => {
    const snakeKey = camelToSnakeCase(key);
    setClauses.push(`${snakeKey} = ?`);
    values.push(value);
  });
  setClauses.push("updated_at = ?");
  values.push(today);
  values.push(userId);
  const query = `UPDATE user SET ${ setClauses.join(', ') } WHERE id = ?`;
  try {
    await db.prepare(query).run(values);
    const updatedRecord = await db.prepare('SELECT * FROM user WHERE id = ?').get(userId);
    return updatedRecord;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}


export default {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  sendEmailVerification,
  findUserByEmail,
  createUser,
  softDeleteUser,
  getAllUsers,
  getUserDetail,
  update
};
