import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createReservation, deleteReservation, getAllReservation, getReservation , getTotal , getTotalByName, getAllReservationByAvailability } from "../controllers/reservation.controller.js";

const reservationRouter = new Hono();


reservationRouter.post(
    "/", zValidator('json',
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

reservationRouter.delete(
    "/:id", 
    zValidator('param', 
        z.object(
        {
            id: z.string()
        }
    )), 
    deleteReservation
);
reservationRouter.get('/', async (c) => {
    const availability = c.req.query('id_availability');
    if (!availability) {
        return c.json({ error: "Le paramètre 'id_availability' est requis" }, 400);
    }
    return getAllReservationByAvailability(c);
    
});
reservationRouter.get('/',getAllReservation);
reservationRouter.get('/total',getTotal);

reservationRouter.get(
    '/:id',
    zValidator(
        'param',
        z.object({
            id: z.string().regex(/^\d+$/),
        })), getReservation
);
reservationRouter.get('/total/:name', getTotalByName);





export default reservationRouter;