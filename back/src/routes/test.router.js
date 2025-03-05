import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from 'zod';
import {
    creationOrganisation,
    softDeleteOrganisation,
    getAllOrganisationsByCategory,
    updateOrganisation,
    getTypesForRestaurant,
    getOrganisationById,
    getCountRestaurants
} from "../controllers/organisation.controller.js";
const testRouter = new Hono();

testRouter.get('/count', getCountRestaurants);
export default testRouter