import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import {
    creationOrganisation,
    softDeleteOrganisation,
    getAllOrganisationsByCategory,
    updateOrganisation,
    getTypesForRestaurant,
} from "../controllers/organisation.controller.js";
const restaurantRouter = new Hono();

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
    )), creationOrganisation
)
restaurantRouter.delete('/:id', softDeleteOrganisation );

restaurantRouter.get('/', getAllOrganisationsByCategory);

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
            maxMeal: z.number().nullable().optional(),
            description: z.string().optional(),
            image: z.string().optional()
        })), updateOrganisation
);

restaurantRouter.get('/:id/type', getTypesForRestaurant );

export default restaurantRouter;

