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

  async function updateBeneficiary(beneficiaryId, data) {
    const setClauses = [];
    const values = [];
  
    Object.entries(data).forEach(([key, value]) => {
      setClauses.push(`${key} = ?`);
      values.push(value);
    });
    values.push(beneficiaryId);
  
    const query = `
      UPDATE beneficiary 
      SET ${setClauses.join(', ')}
      WHERE id = ?
    `;
    await db.prepare(query).run(values);
    return await db.prepare('SELECT * FROM beneficiary WHERE id = ?').get(beneficiaryId);
  }

  async function deleteBeneficiary(id) {
    const query = `
      UPDATE beneficiary
      SET is_archived = 1, 
      updated_at = CURRENT_TIMESTAMP , 
      deleted_at = CURRENT_TIMESTAMP
      WHERE id =  ?
    `;
    const result = await db.prepare(query).get(id);
    return true;
  }

  async function getAllBeneficiary() {
    const query = "SELECT b.*, o.id AS organization_id, o.name AS organization_name FROM beneficiary b INNER JOIN beneficiary_organization bo ON b.id = bo.beneficiary_id INNER JOIN organization o ON bo.organization_id = o.id";
    const result = await db.prepare(query).all()
    return result;
  }

  async function getBeneficiary(id) {
    const query = 'SELECT b.*, o.id AS organization_id, o.name AS organization_name FROM beneficiary b INNER JOIN beneficiary_organization bo ON b.id = bo.beneficiary_id INNER JOIN organization o ON bo.organization_id = o.id WHERE b.id=?';
    const result = await db.prepare(query).get(id)
    return result;
  }

  async function update(beneficiaryId, data) {
    let today = new Date().toISOString();
    const setClauses = [];
    const values = [];
    function camelToSnakeCase(str) {
      return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
    Object.entries(data).forEach(([key, value]) => {
      const snakeKey = camelToSnakeCase(key);
      setClauses.push(`${snakeKey} = ?`);
      values.push(value);
    });
    setClauses.push("updated_at = ?");
    values.push(today);
    values.push(beneficiaryId);
    const query = `UPDATE beneficiary SET ${ setClauses.join(', ') } WHERE id = ?`;
    try {
      await db.prepare(query).run(values);
      const updatedRecord = await db.prepare('SELECT * FROM beneficiary WHERE id = ?').get(beneficiaryId);
      return updatedRecord;
    } catch (error) {
      console.error('Error updating beneficiary:', error);
      throw new Error('Failed to update beneficiary');
    }
  }

  export default {createBeneficiary, deleteBeneficiary, getAllBeneficiary, getBeneficiary,updateBeneficiary,update}