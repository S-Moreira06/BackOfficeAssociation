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
async function deleteOption(data) {
    const query = 'DELETE FROM option WHERE id = ?';
    const values = [data.id];
    const result = await db.prepare(query).run(values);
    return result.changes > 0;
}
async function getAllOption(req, res) {
    const query = 'SELECT * FROM option';
    const result = await db.prepare(query).all();
    return result;
}
export default {
    creationOption,
    deleteOption,
    getAllOption
};