import organizationService from '../services/organization.service.js';
import typeOrganizationService from "../services/typeOrganization.service.js";

async function creationOrganization(c) {
    try {
        const data = c.req.valid('json');
        const parts = c.req.path.split("/api/");
        data.category = parts[1];
        await organizationService.createOrganization(data);
        return c.json({ message: `${data.category} created successfully.` }, 201);
    } catch (error) {
        console.error(error);
        return c.json({ error: `Failed to create ${data.category}.` }, 400);
    }
}
async function softDeleteOrganization(c) {
    try {
        const id = c.req.param('id');
        await organizationService.softDeleteOrganization(id);
        return c.json({ message: `Organization deleted successfully.` }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: `Failed to delete organization.` }, 400);
    }
}

async function getAllOrganizationsByCategory(c) {
    let category = 'association'; // Déclaration de category avant le try
    try {
        const testUrl = c.req.url.match(/restaurant/i);
        category = testUrl ? testUrl[0] : 'association';
        const organizations = await organizationService.getAllOrganizationsByCategory(category);
        return c.json({
            message: `Get all ${category}s successful`,
            organizations: organizations
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({error: `Failed to get ${category}s`}, 400);
    }
}
async function getOrganizationById(c) {
    try {
        const id = c.req.param('id');
        const organization = await organizationService.getOrganizationById(id);
        if (!organization) {
            return c.json({ error: "Organization not found" }, 404);
        }
        return c.json({
            message: `Organization details retrieved successfully`,
            organization
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to retrieve organization details" }, 400);
    }
}
async function updateOrganization(c) {
    try {
        const id = c.req.param('id');
        const data = c.req.valid('json');
        await organizationService.updateOrganization(id, data);
        return c.json({ message: `Organization updated successfully` }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to update organization" }, 400);
    }
}
async function getTypesForRestaurant(c) {
    try {
        const id = c.req.param('id');
        const types = await typeOrganizationService.getTypesForRestaurant(id);
        return c.json({ message: "Restaurant types retrieved successfully", types }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to retrieve restaurant types" }, 400);
    }
}
async function findOrganizationById(c) {
    try {
        const id = c.req.param('id');
        const organization = await organizationService.findOrganizationById(id);
        if (!organization) {
            return c.json({ error: "Organization not found" }, 404);
        }
        return c.json({
            message: "Organization details retrieved successfully",
            organization
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to retrieve organization details" }, 400);
    }
}
async function getCountRestaurants(c) {
    try {
        const count = await organizationService.getCountRestaurants();
        return c.json({ count }, 200);
    } catch (error) {
        console.error('Error retrieving restaurant count:', error);
        return c.json({ error: 'Server error' }, 500);
    }
}
async function getCountAsso(c) {
    try {
        const count = await organizationService.getCountAsso();
        return c.json({ count }, 200);
    } catch (error) {
        console.error('Error retrieving association count:', error);
        return c.json({ error: 'Server error' }, 500);
    }
}

async function getAllRestaurantByCity(c) {
    try {
        const city = c.req.param('city');
        const restaurants = await organizationService.getAllRestaurantByCity(city);
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
        const association = await organizationService.getAllAssociationByCity(city);
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
    creationOrganization,
    updateOrganization,
    getAllOrganizationsByCategory,
    softDeleteOrganization,
    getTypesForRestaurant,
    findOrganizationById,
    getOrganizationById,
    getCountRestaurants,
    getCountAsso,
    getAllRestaurantByCity,
    getAllAssociationByCity,
    getRestaurantsStats
};