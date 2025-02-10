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

export default {createReservation, deleteReservation, getAllReservation};