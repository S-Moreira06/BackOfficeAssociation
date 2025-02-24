import db from '../config/database.js';
async function createOptionOrganisation(idOption, idRestaurant) {
    const query = `INSERT INTO option_organisation (
        id_restaurant, id_option)
        VALUES (?,?)`;

    const values = [idOption, idRestaurant];
    const result = await db.prepare(query).run(values);
    return result.changes > 0;
}

async  function getOptionsForOrganisation(idOrganisation){
    const query = `SELECT o.name
        FROM option_organisation AS oo
        INNER JOIN option AS o ON oo.id_option = o.id
        WHERE  uo.id_organisation = ? `;
    const result = db.prepare(query).all(idOrganisation);
    return result;
}

async function deleteOptionOrganisation(id) {
    const query = 'DELETE FROM option_organisation WHERE id= ?';
    const result = db.prepare(query).run(id);
    return result.changes > 0;
}


export default { createOptionOrganisation, getOptionsForOrganisation, deleteOptionOrganisation }