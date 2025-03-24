 import beneficiaryService from '../services/beneficiary.service.js'

async function createBeneficiary(c) {
  try {
    const data = c.req.valid('json')
    await beneficiaryService.createBeneficiary(data)
    return c.json({
      message: 'beneficiary is added'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error : 'beneficiary adding failed'}, 400)
  }
}

async function updateBeneficiary(c) {
  try {
    const beneficiaryId = c.req.param('id');
    const data = c.req.valid('json');
    await beneficiaryService.update(beneficiaryId, data);
    return c.json({
      message: 'Update beneficiary successfull'
    }, 201)
  } catch (error) {
    console.error(error);
    return c.json({error: 'Update beneficiary failed'}, 400)
  }
}

async function deleteBeneficiary(c) {
  try {
    const id = c.req.param('id')
    await beneficiaryService.deleteBeneficiary(id)
    return c.json({
      message: 'beneficiary archived.'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'archiving failed' }, 400)
  }
}

async function getAllBeneficiary(c) {
  try {
    const beneficiary = await beneficiaryService.getAllBeneficiary();
    return c.json({
      message: "beneficiary's list available",
      beneficiary: beneficiary
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'beneficiary list loading failed'}, 400)
  }
}
async function getAllBeneficiaryByAsso(c) {
  try {
    const id = c.req.param("id")
    const beneficiary = await beneficiaryService.getAllBeneficiaryByAsso(id);
    return c.json({
      message: `beneficiary's list available for asso with id ${id}` ,
      beneficiary:beneficiary
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'beneficiary list loading failed'}, 400)
  }
}

async function getBeneficiary(c) {
  try {
      const id = c.req.param('id');
      const beneficiary = await beneficiaryService.getBeneficiary(id);
      if(!beneficiary) {
        return c.json({ error : 'beneficiary not found'},404)
      }
      return c.json({
          message: "beneficiary informations available",
          beneficiary: beneficiary
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'beneficiary information loading failed'}, 400)
  }
}



  export {createBeneficiary,deleteBeneficiary, getAllBeneficiary,getAllBeneficiaryByAsso,getBeneficiary,updateBeneficiary}



