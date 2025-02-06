import db from '../config/database.js';

async function createAvailability(data) {
    let price = data.price*100;
    const [dayServiceStart, monthServiceStart, yearServiceStart, hoursServiceStart, minutesServiceStart] = data.serviceStart.split(/[/\s:]/);
    const serviceStartToIsoString = `${yearServiceStart}-${monthServiceStart}-${dayServiceStart}T${hoursServiceStart}:${minutesServiceStart}:00`;
    const serviceStart = new Date(serviceStartToIsoString).toISOString();
    const [dayServiceEnd, monthServiceEnd, yearServiceEnd, hoursServiceEnd, minutesServiceEnd] = data.serviceEnd.split(/[/\s:]/);
    const serviceEndToIsoString = `${yearServiceEnd}-${monthServiceEnd}-${dayServiceEnd}T${hoursServiceEnd}:${minutesServiceEnd}:00`;
    const serviceEnd = new Date(serviceEndToIsoString).toISOString();
    const query = `INSERT INTO availability (restaurant_id,
                                             service_start, service_end, deadline_accept,
                                             on_site, take_away, max_people, price,
                                             commentary)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        data.restaurant_id, serviceStart, serviceEnd,
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