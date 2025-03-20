import db from '../config/database.js';
async function createOptionOrganization(idOption, idRestaurant) {
    const query = `INSERT INTO option_organization (
        id_restaurant, id_option)
        VALUES (?,?)`;

    const values = [idOption, idRestaurant];
    const result = await db.prepare(query).run(values);
    return result.changes > 0;
}

async  function getOptionsForOrganization(idOrganization){
    const query = `SELECT o.name
        FROM option_organization AS oo
        INNER JOIN option AS o ON oo.id_option = o.id
        WHERE  uo.id_organization = ? `;
    const result = db.prepare(query).all(idOrganization);
    return result;
}

async function deleteOptionOrganization(id) {
    const query = 'DELETE FROM option_organization WHERE id= ?';
    const result = db.prepare(query).run(id);
    return result.changes > 0;
}


export default { createOptionOrganization, getOptionsForOrganization, deleteOptionOrganization }