import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import {creationOption} from "../controllers/option.controller.js";
import {deleteOption} from "../controllers/option.controller.js";
import {getAllOption} from "../controllers/option.controller.js";
import {getOption} from "../controllers/option.controller.js";

const optionRouter = new Hono();
optionRouter.post(
    "/", zValidator('json', z.object({
            name: z.string(),

        }
    )), creationOption
)
optionRouter.delete(
    "/:id", zValidator('param', z.object(
        {
            id: z.string()
        }
    )), deleteOption
)
optionRouter.get('/', getAllOption);

optionRouter.get(
    '/:id',
    zValidator(
        'param',
        z.object({
            id: z.string().regex(/^\d+$/),
        })), getOption
);
export default optionRouter;