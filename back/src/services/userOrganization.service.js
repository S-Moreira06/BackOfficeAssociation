import db from '../config/database.js';
async function createUserOrganization(idUser, idOrganization) {
    const query = `INSERT INTO user_organization (
        id_organization, id_organization)
        VALUES (?,?)`;

    const values = [idOrganization, idUser];
    const result = await db.prepare(query).run(values);
    return result.changes > 0;
}

async  function getUsersForOrganization(idOrganization){
    const query = `SELECT u.firstname, u.lastname, u.email, u.address, u.zip,
       u.city, u.phone, u.role 
        FROM user_organization as uo
        INNER JOIN user AS u ON uo.id_user = u.id
        WHERE  uo.id_organization = ? `;
    const result = db.prepare(query).all(idOrganization);
    return result;
}

async function deleteUserOrganization(id) {
    const query = 'DELETE FROM user_organization WHERE id= ?';
    const result = db.prepare(query).run(id);
    return result.changes > 0;
}


export default { createUserOrganization, getUsersForOrganization, deleteUserOrganization }