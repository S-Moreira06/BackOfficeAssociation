import db from '../config/database.js'


async function createRequest(data) {
  const query = `
    INSERT INTO request (category, name, address, zip, city, firstname, lastname,  email, phone)
    VALUES (?,?,?,?,?,?,?,?,?)
  `;
  const values = [data.category,data.name, data.address, data.zip, data.city, data.firstname, data.lastname,  data.email, data.phone];
  
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM request WHERE id = ?').get(result.lastInsertRowid); 
}

async function deleteRequest(requestId) {
  const query = `
    UPDATE request
    SET is_archived = 1, 
    updated_at = CURRENT_TIMESTAMP , 
    deleted_at = CURRENT_TIMESTAMP
    WHERE id =  ?
  `;
  const values = [requestId.id];
  const result = await db.prepare(query).run([requestId.id]);
  return await db.prepare('SELECT is_archived FROM request WHERE id= ?').get(requestId.id);
}

async function getAllRequest() {
  const query = 'SELECT * FROM request';
  const result = await db.prepare(query).all()
  return result;
}

async function getRequest(id) {
  const query = 'SELECT * FROM request WHERE id=?';
  const result = await db.prepare(query).get(id)
  return result;
}

export default {createRequest, deleteRequest, getAllRequest, getRequest};