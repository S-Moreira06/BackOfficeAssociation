import { defaultErrorMap } from 'zod';
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

async function deleteReservation(reservationId) {
  const query = `
    UPDATE reservation
    SET status = 'deleted',
    is_archive = 1, 
    updated_at = CURRENT_TIMESTAMP , 
    deleted_at = CURRENT_TIMESTAMP
    WHERE id =  ?
  `;
  const result = await db.prepare(query).get(reservationId);
  return true;
}

async function getAllReservation(req,res) {
  const query = 'SELECT * FROM reservation';
  const result = await db.prepare(query).all()
  return result;
}

async function getReservation(id) {
  const query = 'SELECT * FROM reservation WHERE id=?';
  const result = await db.prepare(query).get(id)
  return result;
}
async function getTotal() {
  const query = 'SELECT SUM(nb_place_setting) AS total FROM reservation';
  const result = await db.prepare(query).get();

  return result  ;
}
async function getTotalByName(name) {
  const query = `
    SELECT SUM(nb_place_setting) AS total 
    FROM reservation 
    WHERE id_organisation = (
      SELECT id FROM organisation WHERE name = ?
    )
  `;

  const result = await db.prepare(query).get(name);

  return result?.total || 0;
}

async function getAllReservationByAvailability(id_availability) {
  const query = 'SELECT * FROM reservation WHERE id_availability = ?';
  const result = await db.prepare(query).all(id_availability);
  console.log('Type de id_availability:', typeof id_availability, id_availability);
  return result;
}
async function valid(id_reservation) {
  const query= `UPDATE reservation SET status = 'confirmed', updated_at = CURRENT_TIMESTAMP WHERE id= ?`;
  const result = await db.prepare(query).get(id_reservation);
  return result;
}

export default { 
  createReservation, 
  deleteReservation, 
  getAllReservation, 
  getReservation, 
  getTotalByName, 
  getAllReservationByAvailability,
  valid
 };

