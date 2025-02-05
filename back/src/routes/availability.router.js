import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import {createAvailability, getAllAvailabilities, deleteAvailability, updateAvailability } from "../controllers/availability.controller.js";
const availabilityRouter = new Hono();

availabilityRouter.post(
    "/", zValidator('json',
        z.object( {
            restaurantId: z.number().int(),
            serviceStart: z.string(),
            serviceEnd: z.string(),
            deadlineAccept: z.string(),
            onSite: z.number().int(),
            takeAway: z.number().int(),
            maxPeople: z.number().int(),
            price: z.string(),
            commentary: z.string().max(255).optional()
        })
    ),
    createAvailability
);
export default  availabilityRouter;

