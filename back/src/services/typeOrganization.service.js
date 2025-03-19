import db from '../config/database.js';
async function createTypeOrganization(idOrganization, idType) {
    const query = `INSERT INTO type_organization (
        id_organization, id_type)
        VALUES (?,?)`;

    const values = [idOrganization, idType];
    const result     = await db.prepare(query).run(values);
    return result.changes > 0;
}

async  function getTypesForRestaurant(idOrganization){
    const query = `SELECT t.name
                   FROM type_organization as t_o    
                            INNER JOIN type AS t ON t_o.id_type = t.id
                   WHERE  t_o.id_organization = ? `;
    const result = db.prepare(query).all(idOrganization);
    return result;
}

async function deleteTypeOrganization(id) {
    const query = 'DELETE FROM type_organization WHERE id= ?';
    const result = db.prepare(query).run(id);
    return result.changes > 0;
}


export default { createTypeOrganization, getTypesForRestaurant, deleteTypeOrganization }