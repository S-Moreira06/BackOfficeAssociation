import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import {creationOrganisation, getAllOrganisationsByCategory} from '../controllers/organisation.controller.js';

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
//associationRouter.get('/:id', getOrganisationFromId);

export default associationRouter;