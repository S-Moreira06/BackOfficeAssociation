import organisationService from '../services/organisation.service.js';
import typeOrganisationService from "../services/typeOrganisation.service.js";

async function creationOrganisation(c) {
    try {
        const data = c.req.valid('json');
        const parts = c.req.path.split("/api/");
        data.category = parts[1];
        await organisationService.createOrganisation(data);
        return c.json({ message: `${data.category} created successfully.` }, 201);
    } catch (error) {
        console.error(error);
        return c.json({ error: `Failed to create ${data.category}.` }, 400);
    }
}
async function softDeleteOrganisation(c) {
    try {
        const id = c.req.param('id');
        await organisationService.softDeleteOrganisation(id);
        return c.json({ message: `Organisation deleted successfully.` }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: `Failed to delete organisation.` }, 400);
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
        return c.json({error: `Failed to get ${category}s`}, 400);
    }
}
async function getOrganisationById(c) {
    try {
        const id = c.req.param('id');
        const organisation = await organisationService.getOrganisationById(id);
        if (!organisation) {
            return c.json({ error: "Organisation not found" }, 404);
        }
        return c.json({
            message: `Organisation details retrieved successfully`,
            organisation
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to retrieve organisation details" }, 400);
    }
}
async function updateOrganisation(c) {
    try {
        const id = c.req.param('id');
        const data = c.req.valid('json');
        await organisationService.updateOrganisation(id, data);
        return c.json({ message: `Organisation updated successfully` }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to update organisation" }, 400);
    }
}
async function getTypesForRestaurant(c) {
    try {
        const id = c.req.param('id');
        const types = await typeOrganisationService.getTypesForRestaurant(id);
        return c.json({ message: "Restaurant types retrieved successfully", types }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to retrieve restaurant types" }, 400);
    }
}
async function findOrganisationById(c) {
    try {
        const id = c.req.param('id');
        const organisation = await organisationService.findOrganisationById(id);
        if (!organisation) {
            return c.json({ error: "Organisation not found" }, 404);
        }
        return c.json({
            message: "Organisation details retrieved successfully",
            organisation
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to retrieve organisation details" }, 400);
    }
}
async function getCountRestaurants(c) {
    try {
        const count = await organisationService.getCountRestaurants();
        return c.json({ count }, 200);
    } catch (error) {
        console.error('Error retrieving restaurant count:', error);
        return c.json({ error: 'Server error' }, 500);
    }
}
async function getCountAsso(c) {
    try {
        const count = await organisationService.getCountAsso();
        return c.json({ count }, 200);
    } catch (error) {
        console.error('Error retrieving association count:', error);
        return c.json({ error: 'Server error' }, 500);
    }
}
async function getAllRestaurantByCity(c) {
    try {
        const city = c.req.param('city');
        const restaurants = await organisationService.getAllRestaurantByCity(city);
        return c.json({
            message: `Liste des restaurants à ${city}`,
            restaurants
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Erreur serveur', details: error.message }, 500);
    }
}
async function getAllAssociationByCity(c) {
    try {
        const city = c.req.param('city');
        const association = await organisationService.getAllAssociationByCity(city);
        return c.json({
            message: `Liste des association à ${city}`,
            association
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Erreur serveur', details: error.message }, 500);
    }
}

async function getRestaurantsStats(c) {
    try {
        const id = c.req.param('id');
        const restaurantsStats = await organisationService.getRestaurantsStats(id);
        return c.json({
            message: "restaurant's stats available",
            restaurantsStats: restaurantsStats
        }, 200)

    } catch (error) {
        console.error('Erreur lors de la récupération des stats:', error);
        return c.json({ error: 'Erreur interne du serveur' }, 500);
    }
    
}


export {
    creationOrganisation,
    updateOrganisation,
    getAllOrganisationsByCategory,
    softDeleteOrganisation,
    getTypesForRestaurant,
    findOrganisationById,
    getOrganisationById,
    getCountRestaurants,
    getCountAsso,
    getAllRestaurantByCity,
    getAllAssociationByCity,
    getRestaurantsStats
};