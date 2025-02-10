import db from '../config/database.js';

async function createOrganisation(data) {
  const query = `
      INSERT INTO organisation (name, address, zip, city, siret, type, contact, email ,phone ,max_meal ,description ,image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [data.name, data.address, data.zip, data.city , data.siret ,data.type, data.contact, data.email, data.phone , data.max_meal, data.description, data.image , data.created_at, data.updated_at, data.deleted_at];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM organisation WHERE id = ?').get(result.lastInsertRowid);
}
async function deleteOrganisation(data) {
  const query = 'DELETE FROM organisation WHERE id = ?';
  const values = [data.id];
  const result = await db.prepare(query).run(values);
  return result.changes > 0;
}
async function getAllOrganisations(req, res) {
  const query = 'SELECT * FROM organisation';
  const result = await db.prepare(query).all();
  return result;
}
async function findOrganisationByName(data) {
  const query = 'SELECT * FROM organisation WHERE name = ?';
  const result = await db.prepare(query).all(data.name);
  return result;
}

export default {
  createOrganisation,
  deleteOrganisation ,
  getAllOrganisations,
  findOrganisationByName
};