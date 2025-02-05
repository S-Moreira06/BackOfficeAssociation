import beneficiaryService from '../services/beneficiary.service.js'

async function createBeneficiary(c) {
  try {
    const data = c.req.valid('json')
    await beneficiaryService.createBeneficiary(data)
    return c.json({
      message: 'Le béneficiaire a bien été ajouté.'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error : 'beneficiary adding failed'}, 400)
  }
}

async function deleteBeneficiary(c) {
  try {
    const data = c.req.valid('json')
    await beneficiaryService.deleteBeneficiary(data)
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
      message: 'Liste des béneficiaire disponible',
      beneficiary: beneficiary
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'beneficiary list loading failed'}, 400)
  }
}

async function getBeneficiary(c) {
    try {
        const data = c.req.valid('json');
        const beneficiary = await beneficiaryService.getBeneficiary(data);
        return c.json({
            message: 'Liste des béneficiaire disponible',
            beneficiary: beneficiary
      }, 200)
    } catch (error) {
      console.error(error)
      return c.json({ error: 'beneficiary list loading failed'}, 400)
    }
  }

  export {createBeneficiary,deleteBeneficiary, getAllBeneficiary,getBeneficiary}


