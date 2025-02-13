async function createTypeOrganisation(idOrganisation, idType) {
    const query = `INSERT INTO type_organisation (
        id_organisation, id_type)
        VALUES (?,?)`;

    const values = [idOrganisation, idType];
    const result = await db.prepare(query).run(values);
    return result.changes > 0;
}

async  function getAllTypeOrganisationFromOrganisationId(idOrganisation){
    const query = 'SELECT * FROM type_organisation where id_organisation = ?';
    const result = db.prepare(query).all(idOrganisation);
    return result;
}

async function deleteTypeOrganisation(id) {
    const query = 'DELETE FROM type_organisation WHERE id= ?'
    const result = db.prepare(query).run(id);
    return result.changes > 0;
}

export default { createTypeOrganisation, getAllTypeOrganisationFromOrganisationId, deleteTypeOrganisation }