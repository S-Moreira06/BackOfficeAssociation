import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import {creationOption} from "../controllers/option.controller.js";
import {deleteOption} from "../controllers/option.controller.js";
import {getAllOption} from "../controllers/option.controller.js";

const optionRouter = new Hono();
optionRouter.post(
    "/add-option", zValidator('json', z.object({
            name: z.string(),

        }
    )), creationOption
)
optionRouter.delete(
    "/delete", zValidator('json', z.object(
        {
            id: z.number().int()
        }
    )), deleteOption
)
optionRouter.get('/', getAllOption);

export default optionRouter;