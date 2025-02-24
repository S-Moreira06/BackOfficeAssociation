import db from '../config/database.js';
async function createTypeOrganisation(idOrganisation, idType) {
    const query = `INSERT INTO type_organisation (
        id_organisation, id_type)
        VALUES (?,?)`;

    const values = [idOrganisation, idType];
    const result     = await db.prepare(query).run(values);
    return result.changes > 0;
}

async  function getTypesForRestaurant(idOrganisation){
    const query = `SELECT t.name
                   FROM type_organisation as t_o    
                            INNER JOIN type AS t ON t_o.id_type = t.id
                   WHERE  t_o.id_organisation = ? `;
    const result = db.prepare(query).all(idOrganisation);
    return result;
}

async function deleteTypeOrganisation(id) {
    const query = 'DELETE FROM type_organisation WHERE id= ?';
    const result = db.prepare(query).run(id);
    return result.changes > 0;
}


export default { createTypeOrganisation, getTypesForRestaurant, deleteTypeOrganisation }