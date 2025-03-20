import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import {
    creationOrganization,
    softDeleteOrganization,
    getAllOrganizationsByCategory,
    updateOrganization,
    getTypesForRestaurant,
    getOrganizationById,
    getCountRestaurants
} from "../controllers/organization.controller.js";
const testRouter = new Hono();

testRouter.get('/count', getCountRestaurants);
export default testRouter