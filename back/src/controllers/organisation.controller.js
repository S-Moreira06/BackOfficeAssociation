import organisationService from '../services/organisation.service.js'
import typeOrganisationService from "../services/typeOrganisation.service.js";
import OrganisationService from "../services/organisation.service.js";

async function creationOrganisation(c) {
    try {
        const data  = c.req.valid('json');

        const parts = c.req.path.split("/api/");

        data.category = parts[1];

        await organisationService.createOrganisation(data);

        return c.json({
            message: `${ data.category } created successfully.`
        }, 201)
    } catch (error) {
        console.error(error)
        return c.json({ error: `${ data.category } created failed.` }, 400)
    }
}
async function softDeleteOrganisation(c) {
    try {
        const id = c.req.param('id')
        const path = c.req.path.match(/\/([a-zA-Z]+)\/(\d+)/);
        await organisationService.softDeleteOrganisation(id);
        return c.json({
            message: `${ path[1] } deleted successfully.`
        }, 201)
    } catch (error) {
        console.error(error)
        return c.json({ error: `${ path[1]  } deleted failed.` }, 400)
    }
}

async function getAllOrganisationsByCategory(c) {
    let category = 'association'; // Déclaration de category avant le try
    try {
        const testUrl = c.req.url.match(/restaurant/i);
        category = testUrl ? testUrl[0] : 'association';

        const organisations = await organisationService.getAllOrganisationsByCategory(category);
        return c.json({
            message: `Get all ${category}s successful`,
            organisations: organisations
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: `Get all ${category}s failed` }, 400);
    }
}

async function getOrganisationById(c) {
    try {
        const id = c.req.param('id');
        const testUrl = c.req.url.match(/restaurant/i);
        const category = testUrl ? testUrl[0] : 'association';
        const organisationDetail = await organisationService.getOrganisationById(id);
        return c.json({
            message: `get  ${ category } detail successfull`,
            organisation: organisationDetail
        }, 201)
    } catch (error) {
        console.error(error);
        return c.json({
            error: `get  ${ category } detail failed`
        }, 400)
    }
}

async function updateOrganisation(c) {
    try {
        const id = c.req.param('id');
        const data  = c.req.valid('json');
        const testUrl = c.req.url.match(/restaurant/i);
        const type = testUrl?.[0] ?? 'association';
        await organisationService.updateOrganisation(id,data);
        return c.json({message: `Update ${ type } successfull`}, 201);
    } catch (error) {
        console.error(error);
        return c.json({error: `Update ${ type } failed`}, 400)
    }
}

async function getTypesForRestaurant(c) {
    try {
        const id = c.req.param('id');
        const result = await typeOrganisationService.getTypesForRestaurant(id);
        return c.json({message: `Get type for restaurant successfull` , types: result}, 201);
    } catch (error) {
        console.error(error);
        return c.json({error: `Get type for restaurant failed`}, 400)
    }

}

async function findOrganisationById(c) {
    try {
        const testUrl = c.req.url.match(/restaurant/i);
        const category = testUrl ? testUrl[0] : 'association';
        const id = c.req.param('id');
        const organisation = await OrganisationService.findOrganisationById(id);
        return c.json({
            message: `Get  ${ category } detail successfull`,
            organisation: organisation
        }, 200)
    } catch (error) {
        console.error(error)
        return c.json({ error: `Get  ${ category } detail failed` }, 400)
    }

}


export { creationOrganisation  ,updateOrganisation, getAllOrganisationsByCategory,
    softDeleteOrganisation, getTypesForRestaurant, findOrganisationById, getOrganisationById }