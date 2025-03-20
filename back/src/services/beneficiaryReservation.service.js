import db from '../config/database.js';
async function createBeneficiaryReservation(idBeneficiary, idReservation) {
    const query = `INSERT INTO beneficiary_reservation (
        id_beneficiary, id_reservation)
        VALUES (?,?)`;

    const values = [idBeneficiary, idReservation];
    const result = await db.prepare(query).run(values);
    return result.changes > 0;
}

async  function getBeneficiariesForReservation(idReservation){
    const query = `SELECT b.id, b.firstname, b.lastname, b.email, b.address, b.zip,
       b.city, b.phone, 
        FROM beneficiary_reservation as br
        INNER JOIN beneficiary AS b ON br.id_beneficiary = b.id
        WHERE  br.id_organization = ? `;
    const result = db.prepare(query).all(idReservation);
    return result;
}

async function deleteBeneficiaryReservation(id) {
    const query = 'DELETE FROM beneficiary_reservation WHERE id= ?';
    const result = db.prepare(query).run(id);
    return result.changes > 0;
}


export default { createBeneficiaryReservation, getBeneficiariesForReservation, deleteBeneficiaryReservation }