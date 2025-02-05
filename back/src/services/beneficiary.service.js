import db from '../config/database.js'

async function createBeneficiary(data) {
    const query = `
      INSERT INTO beneficiary (firstname, lastname, address, zip, city, phone, remark)
      VALUES (?,?,?,?,?,?,?)
    `;
    const values = [data.firstname,data.lastname,data.address,data.zip,data.city, data.phone,data.remark, data.rgpd];
    
    const result = await db.prepare(query).run(values);
    return await db.prepare('SELECT * FROM beneficiary WHERE id = ?').get(result.lastInsertRowid); 
  }

  export default {createBeneficiary}