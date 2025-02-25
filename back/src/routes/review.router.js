import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import {
    addReview,
    editReview,
    deleteReview
} from "../controllers/review.controller.js";
import restaurantRouter from "./restaurant.router.js";
const reviewRouter = new Hono();

reviewRouter.post(
    "/", zValidator('json', z.object({
            idBeneficiary: z.number().int(),
            idReservation: z.number().int(),
            message: z.string().max(255).optional(),
            rating: z.number().int(),
        }
    )), addReview
)

reviewRouter.put(
    "/:id", zValidator('json', z.object({
            idBeneficiary: z.number().int().optional(),
            idReservation: z.number().int().optional(),
            message: z.string().max(255).optional(),
            rating: z.number().int().optional(),
        }
    )), editReview
)


reviewRouter.delete(
    "/:id", deleteReview
)


export default reviewRouter;