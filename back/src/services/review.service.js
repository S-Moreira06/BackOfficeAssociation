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

export default {
    addReview
};