import db from '../config/database.js';
async function creationOption(data) {
    const query = `
      INSERT INTO option (name)
      VALUES (?)
    `;
    const values = [data.name];
    const result = await db.prepare(query).run(values);
    return await db.prepare('SELECT * FROM option WHERE id = ?').get(result.lastInsertRowid);
}
async function deleteOption(id) {
    const query = `
        UPDATE option
    SET 
        updated_at = CURRENT_TIMESTAMP ,
        deleted_at = CURRENT_TIMESTAMP
    WHERE id =  ?`
    ;
    const result = await db.prepare(query).get(id);
    return await db.prepare('SELECT * FROM option WHERE id=?').get(id);
}
async function getAllOption(req, res) {
    const query = 'SELECT * FROM option';
    const result = await db.prepare(query).all();
    return result;
}
async function getOption(id) {
    const query = 'SELECT * FROM option WHERE id=?';
    const result = await db.prepare(query).get(id)
    return result;
}
export default {
    creationOption,
    deleteOption,
    getAllOption ,
    getOption
};