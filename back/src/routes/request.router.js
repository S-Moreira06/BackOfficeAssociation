import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createRequest, deleteRequest, getAllRequest, getRequest } from "../controllers/request.controller.js";

const requestRouter = new Hono()

requestRouter.post(
    "/", zValidator('json',
        z.object({
            type: z.string(),
            name: z.string().min(2),
            address: z.string().min(2),
            zip: z.string().min(5).max(6).regex(/^\d+$/, "Le champ doit contenir uniquement des chiffres"),
            city: z.string().min(2),
            firstname: z.string().min(2),
            lastname: z.string().min(2),
            email: z.string().email("Invalid email"),
            phone: z.string().min(2).regex(/^\d+$/, "Le champ doit contenir uniquement des chiffres")
        })
    ),
    createRequest
);

requestRouter.delete(
    "/:id", 
    zValidator('param', 
        z.object(
        {
            id: z.string()
        }
    )), 
    deleteRequest
);

requestRouter.get('/',getAllRequest);

requestRouter.get('/:id',getRequest);


export default requestRouter;