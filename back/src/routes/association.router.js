import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import {
    creationOrganization,
    getAllOrganizationsByCategory,
    findOrganizationById,
    softDeleteOrganization, updateOrganization, getAllAssociationByCity
} from '../controllers/organization.controller.js';
import restaurantRouter from "./restaurant.router.js";

const associationRouter = new Hono();

associationRouter.post(
    "/",
    zValidator('json', z.object({
                name: z.string(),
                address: z.string(),
                zip: z.string(),
                city: z.string(),
                siret: z.string(),
                contact: z.string(),
                email: z.string().email(),
                phone: z.string(),
                max_meal: z.number(),
                description: z.string().optional(),
                image: z.string().optional()
        }
    )),
    creationOrganization
)

associationRouter.get('/', getAllOrganizationsByCategory);
associationRouter.get('/:id', findOrganizationById);
associationRouter.delete('/:id', softDeleteOrganization);
associationRouter.put(
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
            email: z.string().email(),
            phone: z.string().optional(),
            maxMeal: z.number().nullable().optional()
        })), updateOrganization
);
associationRouter.get('/city/:city', getAllAssociationByCity);

export default associationRouter;