import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import {
    creationOrganization,
    softDeleteOrganization,
    getAllOrganizationsByCategory,
    updateOrganization,
    getTypesForRestaurant,
    getOrganizationById,
    getCountRestaurants,
    getCountAsso,
    getAllRestaurantByCity,
    getRestaurantsStats,
    getMealValue
} from "../controllers/organization.controller.js";

const restaurantRouter = new Hono();

restaurantRouter.get('/stats', getRestaurantsStats)
restaurantRouter.get('/stats/:id', getRestaurantsStats)
restaurantRouter.get('/value', getMealValue);
restaurantRouter.get('/value/:category', getMealValue);

restaurantRouter.post(
    "/", zValidator('json', z.object({
            name: z.string(),
            address: z.string(),
            zip: z.string(),
            city: z.string(),
            siret: z.string(),
            contact: z.string(),
            email: z.string().email(),
            phone: z.string(),
            maxMeal: z.number().nullable().optional(),
            description: z.string().optional(),
            image: z.string().optional()
        }
    )), creationOrganization
)
restaurantRouter.delete('/:id', softDeleteOrganization );

restaurantRouter.get('/', getAllOrganizationsByCategory);
restaurantRouter.get('/count', getCountRestaurants);
restaurantRouter.get('/countasso', getCountAsso);

getCountAsso
restaurantRouter.get('/:id', getOrganizationById);

restaurantRouter.put(
    '/:id',
    zValidator(
        'json',
        z.object({
            name: z.string().optional(),
            address: z.string().optional(),
            zip: z.string().optional(),
            city: z.string().optional(),
            siret: z.string().optional(),
            contact: z.string().optional(),
            email: z.string().email().optional(),
            phone: z.string().optional(),
            max_meal: z.number().nullable().optional(),
            description: z.string().optional(),
            image: z.string().optional()
        })), updateOrganization
);

restaurantRouter.get('/:id/type', getTypesForRestaurant );
restaurantRouter.get('/city/:city', getAllRestaurantByCity);






export default restaurantRouter;

