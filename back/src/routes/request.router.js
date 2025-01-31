import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { request } from "../controllers/request.controller.js";

const requestRouter = new Hono()

requestRouter.post(
    "/request", zValidator('json',
        z.object({
            name: z.string().min(2),
            address: z.string().min(2),
            zip: z.string().min(5).max(6),
            city: z.string().min(2),
            siret: z.string().min(2),
            type: z.string(),
            contact: z.string().min(2),
            mail: z.string().email("Invalid email"),
            phone: z.string().min(2).regex(/^\d+$/, "Le texte doit contenir uniquement des chiffres"),
            max_meal: z.string().min(2),
            description: z.string().min(2),
            image: z.string().min(2),
            menu: z.string().min(2),
        })
    ),
    request
);

export default requestRouter;