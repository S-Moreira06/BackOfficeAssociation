import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createReservation, deleteReservation, getAllReservation } from "../controllers/reservation.controller.js";

const reservationRouter = new Hono();

reservationRouter.post(
    "/new-reservation", zValidator('json',
        z.object({
            id_organisation: z.number().int(),
            id_availability: z.string().min(1),
            time: z.string().min(1),
            email: z.string().email("Invalid email"),
            nb_place_setting: z.string().min(1),
            status: z.string().min(1),
            take_away: z.string().min(1),
            commentary: z.string().min(1)
        })
    ),
    createReservation
);

reservationRouter.post(
    "/delete-reservation", 
    zValidator('json', 
        z.object(
        {
            id: z.number().int()
        }
    )), 
    deleteReservation
);

reservationRouter.get('/',getAllReservation);

export default reservationRouter;