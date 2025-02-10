import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import {creationType} from "../controllers/type.controller.js";
import {deleteType} from "../controllers/type.controller.js";
import {getAllType} from "../controllers/type.controller.js";
import {getType} from "../controllers/type.controller.js";
import {updateType} from "../controllers/type.controller.js"

import availabilityRouter from "./availability.router.js";

const typeRouter = new Hono();
typeRouter.post(
    "/", zValidator('json', z.object({
            name: z.string(),

        }
    )), creationType
)
typeRouter.delete(
    "/:id", zValidator('param', z.object(
        {
            id: z.string()
        }
    )), deleteType
)
typeRouter.get('/', getAllType);

typeRouter.get(
    '/:id',
    zValidator(
        'param',
        z.object({
            id: z.string().regex(/^\d+$/),
        })), getType
);
typeRouter.put("/:id", zValidator('json',
    z.object( {
        name: z.string().optional(),
    })
), updateType);
export default typeRouter;