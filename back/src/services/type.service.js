import db from '../config/database.js';
async function creationType(data) {
    const query = `
      INSERT INTO type (name)
      VALUES (?)
    `;
    const values = [data.name];
    const result = await db.prepare(query).run(values);
    return await db.prepare('SELECT * FROM type WHERE id = ?').get(result.lastInsertRowid);
}
async function deleteType(id) {
    const query = `
        UPDATE type
    SET 
        updated_at = CURRENT_TIMESTAMP ,
        deleted_at = CURRENT_TIMESTAMP
    WHERE id =  ?`
    ;
    const result = await db.prepare(query).get(id);
    return await db.prepare('SELECT * FROM type WHERE id=?').get(id);
}
async function getAllType(req, res) {
    const query = 'SELECT * FROM type';
    const result = await db.prepare(query).all();
    return result;
}
async function getType(id) {
    const query = 'SELECT * FROM type WHERE id=?';
    const result = await db.prepare(query).get(id)
    return result;
}
async function updateType(typeId, data) {
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
    values.push(typeId);
    const query = `UPDATE type SET ${ setClauses.join(', ') } WHERE id = ?`;
    console.error(query);
    try {
        await db.prepare(query).run(values);
        const updatedRecord = await db.prepare('SELECT * FROM type WHERE id = ?').get(typeId);
        return updatedRecord;
    } catch (error) {
        console.error('Error updating type:', error);
        throw new Error('Failed to update type')
    }
}


    export default {
        creationType,
            deleteType,
            getAllType ,
            getType,
            updateType }