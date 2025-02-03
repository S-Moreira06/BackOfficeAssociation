import db from '../config/database.js'

async function createRequest(data) {
  const query = `
    INSERT INTO request (name, address, zip, city, siret, type, contact, email, phone, max_meal, description, image, menu)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;
  const values = [data.name,data.address,data.zip,data.city, data.siret, data.type, data.contact, data.email, data.phone,data.max_meal, data.description, data.image, data.menu];
  
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM request WHERE id = ?').get(result.lastInsertRowid); // get premet de lié un paramettre et d'executer la requete et retourner un objet (contrairement a .all() qui retournera un tableau)(libsql))
}

async function deleteRequest(requestId) {
  const query = `
    UPDATE request
    SET is_Archived = true, modified_at = CURRENT_TIMESTAMP , deleted_at = CURRENT_TIMESTAMP
    WHERE id = ? )
  `;
  const result = await db.prepare(query).run(requestId);
  return await db.prepare('SELECT isArchived FROM request WHERE id= ?').get(requestId);
  
}

export default {createRequest, deleteRequest};