import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import {creationOrganisation} from "../controllers/organisation.controller.js";

const organisationRouter = new Hono();
organisationRouter.post(
    "/add-organisation", zValidator('json', z.object({
        name: z.string(),
        address: z.string(),
        zip: z.string(),
        city: z.string(),
        siret: z.string(),
        type: z.string(),
        contact: z.string(),
        email: z.string().email(),
        phone: z.string(),
        repas_max: z.number().nullable().optional(),
        description: z.string().optional(),
        image: z.string().optional()
        }
    )), creationOrganisation
)
organisationRouter.delete(
    "/delete", zValidator('json', z.object(
        {
            id: z.number().int()
        }
    )), deleteOrganisation
);

organisationRouter.get('/', getAllOrganisations);

organisationRouter.post(
    '/find-by-name',
    zValidator(
        'json',
        z.object({
            name: z.string(),
        })), findOrganisationByName
);

export default organisationRouter;
