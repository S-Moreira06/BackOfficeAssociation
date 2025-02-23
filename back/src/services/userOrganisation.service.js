import db from '../config/database.js';
async function createUserOrganisation(idUser, idOrganisation) {
    const query = `INSERT INTO user_organisation (
        id_organisation, id_organisation)
        VALUES (?,?)`;

    const values = [idOrganisation, idUser];
    const result = await db.prepare(query).run(values);
    return result.changes > 0;
}

async  function getUsersForOrganisation(idOrganisation){
    const query = `SELECT u.firstname, u.lastname, u.email, u.address, u.zip,
       u.city, u.phone, u.role 
        FROM user_organisation as uo
        INNER JOIN user AS u ON uo.id_user = u.id
        WHERE  uo.id_organisation = ? `;
    const result = db.prepare(query).all(idOrganisation);
    return result;
}

async function deleteUserOrganisation(id) {
    const query = 'DELETE FROM user_organisation WHERE id= ?';
    const result = db.prepare(query).run(id);
    return result.changes > 0;
}


export default { createUserOrganisation, getUsersForOrganisation, deleteUserOrganisation }