import db from '../config/database.js';

async function createReservation(data) {
    const query = `
    INSERT INTO reservation (id_organisation, id_availability, time, email, nb_place_setting, status, take_away, commentary)
    VALUES (?,?,?,?,?,?,?,?)
  `;
  const values = [data.id_organisation,data.id_availability,data.time,data.email, data.nb_place_setting, data.status, data.take_away, data.commentary];
  
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM reservation WHERE id = ?').get(result.lastInsertRowid);
}

export default {createReservation};