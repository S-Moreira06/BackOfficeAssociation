import db from "../config/database.js";

'../config/database.js';

async function addReview(data) {
    const query = `INSERT INTO review (id_beneficiary,id_reservation, 
                                             message, rating)
                   VALUES (?, ?, ?, ?)`;


    const values = [
        data.idBeneficiary, data.idReservation, data.message ?? null,data.rating,
    ];
    const result = await db.prepare(query).run(values);
    return result.changes > 0;
}

async function softDeleteReview(reviewId){
    try {
        let today = new Date().toISOString();
        const query = `UPDATE review SET is_archived = ?, 
                        deleted_at = ?
                        WHERE id = ?`;
        const values = [1, today, reviewId];
        const result = db.prepare(query).run(values);
        return true
    } catch (err){
        console.log(err);
        throw err;
    }
}

async function updateReview(reviewId, data) {
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
    values.push(reviewId);
    const query = `UPDATE review SET ${ setClauses.join(', ') } WHERE id = ?`;
    console.error(query);
    try {
        await db.prepare(query).run(values);
        const updatedRecord = await db.prepare('SELECT * FROM review WHERE id = ?').get(reviewId);
        return updatedRecord;
    } catch (error) {
        console.error('Error updating availability:', error);
        throw new Error('Failed to update availability');
    }
}

export default {
    addReview,
    softDeleteReview,
    updateReview
};