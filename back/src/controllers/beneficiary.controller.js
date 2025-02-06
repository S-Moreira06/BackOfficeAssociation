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

// async function getBeneficiary(c) {
//     try {
//         const data = c.req.param('id');
//         const beneficiary = await beneficiaryService.getBeneficiary(data);
//         return c.json({
//             message: 'Liste des béneficiaire disponible',
//             beneficiary: beneficiary
//       }, 200)
//     } catch (error) {
//       console.error(error)
//       return c.json({ error: 'beneficiary list loading failed'}, 400)
//     }
//   }

// async function getBeneficiary(c) {
//   try {
//       const id = c.req.param('id');

//       if (!id) {
//           return c.json({ error: 'ID du bénéficiaire manquant' }, 400);
//       }

//       const beneficiary = await beneficiaryService.getBeneficiary(id);
      

//       if (!beneficiary) {
//           return c.json({ message: 'Bénéficiaire non trouvé' }, 404);
//       }

//       return c.json({
//           message: 'Liste des bénéficiaires disponible',
//           beneficiary
//       }, 200);
//   } catch (error) {
//       console.error('Erreur lors de la récupération du bénéficiaire :', error);
//       return c.json({ error: 'Impossible de charger le bénéficiaire' }, 500);
//   }
// }
async function findBeneByid(c) {
  try {
    const id  = c.req.param('id');

    const Beneficiary = await beneficiaryService.findBeneByid(id);

    if (!Beneficiary) {
      return c.json({ message: 'L organisation nexiste pas.' }, 404);
    }

    return c.json(Beneficiary, 200);
  } catch (error) {
    console.error('Erreur lors de la recherche de lorganisation:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
}


  export {createBeneficiary,deleteBeneficiary, getAllBeneficiary,findBeneByid}
  // ,getBeneficiary


