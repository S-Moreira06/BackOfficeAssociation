import db from '../config/database.js';

async function createAvailability(data) {
    const price =  data.price*100;
    const query = `INSERT INTO availability (restaurant_id,date, 
                                             time_start, time_end, deadline_accept,
                                             on_site, take_away, max_people, price,
                                             commentary)
                   VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?)`;


    const values = [
        data.restaurantId, data.date, data.timeStart,data.timeEnd,
        data.deadlineAccept, data.onSite, data.takeAway,
        data.maxPeople, price,
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

async function getAvailabilityById(id){
    const query = 'SELECT * FROM availability WHERE id = ?';
    const result = await db.prepare(query).get(id);
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
        values.push(availabilityId);
        const query = `UPDATE availability SET ${ setClauses.join(', ') } WHERE id = ?`;
        console.error(query);
        try {
            await db.prepare(query).run(values);
            const updatedRecord = await db.prepare('SELECT * FROM availability WHERE id = ?').get(availabilityId);
            return updatedRecord;
        } catch (error) {
            console.error('Error updating availability:', error);
            throw new Error('Failed to update availability');
        }
}

export default {
    createAvailability,
    getAllAvailabilities,
    getAvailabilityById,
    softDeleteAvailability,
    updateAvailability
};