import db from '../config/database.js';

async function createBeneficiaryOrganisation(organisation_id, beneficiary_id) {
    const query = `INSERT INTO beneficiary_organisation (organisation_id, beneficiary_id) VALUES (?, ?)`;
    const values = [organisation_id, beneficiary_id];

    const result = await db.prepare(query).run(values);
    return result.changes > 0;
}

async function getBeneficiariesForOrganisation(organisation_id) {
    const query = `
        SELECT b.id, b.name, b.email
        FROM beneficiary_organisation AS bo
                 INNER JOIN beneficiary AS b ON bo.beneficiary_id = b.id
        WHERE bo.organisation_id = ?
    `;

    const result = await db.prepare(query).all(organisation_id);
    return result;
}

export default { createBeneficiaryOrganisation, getBeneficiariesForOrganisation };