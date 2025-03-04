import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import {createAvailability, getAllAvailabilities, deleteAvailability, updateAvailability, getAvailabilityById } from "../controllers/availability.controller.js";
const availabilityRouter = new Hono();

availabilityRouter.post(
    "/", zValidator('json',
        z.object( {
            restaurantId: z.number().int(),
            date: z.string(),
            timeStart: z.string(),
            timeEnd: z.string(),
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

availabilityRouter.get("/", getAllAvailabilities);

availabilityRouter.get("/:id", getAvailabilityById);

availabilityRouter.put("/:id", zValidator('json',
    z.object( {
        restaurantId: z.number().int().optional(),
        date: z.string().optional(),
        timeStart: z.string().optional(),
        timeEnd: z.string().optional(),
        deadlineAccept: z.string().optional(),
        onSite: z.number().int().optional(),
        takeAway: z.number().int().optional(),
        maxPeople: z.number().int().optional(),
        price: z.string().optional(),
        commentary: z.string().max(255).optional()
    })
), updateAvailability);

availabilityRouter.delete("/:id", deleteAvailability);


export default  availabilityRouter;

