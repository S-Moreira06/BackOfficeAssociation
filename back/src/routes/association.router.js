import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import {
    creationOrganisation,
    getAllOrganisationsByCategory,
    findOrganisationById,
    softDeleteOrganisation, updateOrganisation
} from '../controllers/organisation.controller.js';
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
                maxMeal: z.number()
        }
    )),
    creationOrganisation
)

associationRouter.get('/', getAllOrganisationsByCategory);
associationRouter.get('/:id', findOrganisationById);
associationRouter.delete('/:id', softDeleteOrganisation);
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
            email: z.string().email().optional(),
            phone: z.string().optional(),
            maxMeal: z.number().nullable().optional()
        })), updateOrganisation
);

export default associationRouter;