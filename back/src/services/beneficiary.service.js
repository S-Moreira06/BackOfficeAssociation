import db from '../config/database.js'

async function createBeneficiary(data) {
    const query = `
      INSERT INTO beneficiary (firstname, lastname, address, zip, city, phone, remark)
      VALUES (?,?,?,?,?,?,?)
    `;
    const values = [data.firstname,data.lastname,data.address,data.zip,data.city, data.phone,data.remark];
    
    const result = await db.prepare(query).run(values);
    return await db.prepare('SELECT * FROM beneficiary WHERE id = ?').get(result.lastInsertRowid); 
  }

  async function deleteBeneficiary(beneficiaryId) {
    const query = `
      UPDATE beneficiary
      SET is_archived = 1, 
      updated_at = CURRENT_TIMESTAMP , 
      deleted_at = CURRENT_TIMESTAMP
      WHERE id =  ?
    `;
    const values = [beneficiaryId.id];
    const result = await db.prepare(query).run([beneficiaryId.id]);
    return await db.prepare('SELECT is_archived FROM beneficiary WHERE id= ?').get(beneficiaryId.id);
  }

  async function getAllBeneficiary() {
    const query = 'SELECT * FROM beneficiary';
    const result = await db.prepare(query).all()
    return result;
  }

  async function getBeneficiary(beneficiaryId) {
    const query = 'SELECT * FROM beneficiary WHERE id=?';
    const result = await db.prepare(query).get([beneficiaryId.id])
    return result;
  }

  export default {createBeneficiary, deleteBeneficiary, getAllBeneficiary, getBeneficiary}