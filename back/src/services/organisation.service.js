import db from '../config/database.js';

async function createOrganisation(data) {
  console.error(data);
  const query = `
      INSERT INTO organisation (name, address, zip, city, siret, category, contact, email ,phone ,max_meal ,description ,image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [data.name, data.address, data.zip, data.city , data.siret ,data.category, data.contact, data.email, data.phone , data.max_meal, data.description, data.image , data.created_at, data.updated_at, data.deleted_at];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM organisation WHERE id = ?').get(result.lastInsertRowid);
}
async function softDeleteOrganisation(id){
  try {
    let today = new Date().toISOString();
    const query = `UPDATE organisation SET is_archived = ?,
                                           deleted_at = ?
                   WHERE id = ?`;
    const values = [1, today, id];
    const result = db.prepare(query).run(values);
    return true
  } catch (err){
    console.log(err);
    throw err;
  }
}
async function getAllOrganisationsByCategory(category) {
  const query = 'SELECT * FROM organisation where category = ?';
  const result = await db.prepare(query).all(category);
  if (result.length < 1) {
    throw new Error("No result");
  }
  return result;
}

async function findOrganisationById(id) {
  const query = 'SELECT * FROM organisation WHERE id = ?';
  const result = await db.prepare(query).get(id);
  return result;
}

async function updateOrganisation(organisationId, data) {
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
  values.push(organisationId);
  const query = `UPDATE organisation SET ${ setClauses.join(', ') } WHERE id = ?`;
  try {
    await db.prepare(query).run(values);
    const updatedRecord = await db.prepare('SELECT * FROM organisation WHERE id = ?').get(organisationId);
    return updatedRecord;
  } catch (error) {
    console.error(error);
    throw new Error('Uppdate organisation table failed');
  }
}



export default {
  createOrganisation,
  softDeleteOrganisation ,
  getAllOrganisationsByCategory,
  findOrganisationById,
  updateOrganisation
};