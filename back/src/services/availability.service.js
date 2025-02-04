import db from '../config/database.js';

async function createAvailability(data) {
    const query = `INSERT INTO availability (restaurant_id, service_start,
                                             service_start, service_end, deadline_accept,
                                             on_site, take_away, max_people, price,
                                             commentary)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        data.restaurant_id, data.service_start, data.service_end,
        data.deadline_accept, data.on_site, data.take_away,
        data.max_people, data.max_people, data.price,
        data.commentary
    ];
    const result = await db.prepare(query).run(values);
    return result.changes > 0;
}


async function getAllAvailabilities(){
    const query = 'SELECT * FROM availability';
    const result = await db.prepare(query).all();
    return result;
}


async function softDeleteAvailability(availabilityId){
    try {
        let today = new Date().toISOString();
        const query = `UPDATE availability SET is_archived = ?, 
                        deleted_at = ?
                        WHERE id = ?`;
        const values = [1, today, availabilityId];
        const result = db.prepare(query).run(values);
        return true
    } catch (err){
        console.log(err);
        throw err;
    }
}

async function updateAvailability(availabilityId, data) {
    const setClauses = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
        setClauses.push(`${key} = ?`);
        values.push(value);
        });
    values.push(availabilityId);
    const query = `
                            UPDATE availability
                            SET ${setClauses.join(', ')}
                            WHERE id = ?
                        `;
    await db.prepare(query).run(values);
    return await db.prepare('SELECT * FROM availability WHERE id = ?').get(availabilityId);
}


export default {
    createAvailability,
    getAllAvailabilities,
    softDeleteAvailability,
    updateAvailability
};