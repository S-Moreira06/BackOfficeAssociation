import db from '../config/database.js';

async function createBeneficiaryOrganization(organization_id, beneficiary_id) {
    const query = `INSERT INTO beneficiary_organization (organization_id, beneficiary_id) VALUES (?, ?)`;
    const values = [organization_id, beneficiary_id];

    const result = await db.prepare(query).run(values);
    return result.changes > 0;
}

async function getBeneficiariesForOrganization(organization_id) {
    const query = `
        SELECT b.id
        FROM beneficiary_organization AS bo
                 INNER JOIN beneficiary AS b ON bo.beneficiary_id = b.id
        WHERE bo.organization_id = ?
    `;

    const result = await db.prepare(query).all(organization_id);
    return result;
}
async function deleteBeneficiaryOrganization(id) {
    const query = 'DELETE FROM beneficiary_organization WHERE id= ?';
    const result = db.prepare(query).run(id);
    return result.changes > 0;
}


export default { createBeneficiaryOrganization, getBeneficiariesForOrganization, deleteBeneficiaryOrganization };