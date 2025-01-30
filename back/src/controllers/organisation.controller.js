import organisationService from '../services/organisation.service.js'
import authService from "../services/auth.service.js";

async function creationOrganisation(c) {
  try {
    const data = c.req.valid('json')
    await organisationService.createOrganisation(data);
    return c.json({
      message: 'organisation crée avec sucess.'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'non ok' }, 400)
  }
}
async function deleteOrganisation(c) {
  try {
    const data = c.req.valid('json')
    await organisationService.deleteOrganisation(data);
    return c.json({
      message: 'organisation supprimer avec sucess.'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'non ok' }, 400)
  }
}

async function getAllOrganisations(c) {
  try {
    const organisation = await organisationService.getAllOrganisations();
    return c.json({
      message: 'Liste organisation ok.',
      organisation: organisation
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'non ok' }, 400)
  }
}

async function findOrganisationByName(c) {
  try {
    const data  = c.req.valid('json');

    const organisation = await organisationService.findOrganisationByName(data);

    if (!organisation) {
      return c.json({ message: 'L organisation nexiste pas.' }, 404);
    }

    return c.json(organisation, 200);
  } catch (error) {
    console.error('Erreur lors de la recherche de lorganisation:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
}




export { creationOrganisation , deleteOrganisation ,findOrganisationByName, getAllOrganisations}