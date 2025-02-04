import { Hono } from "hono";
import { zValidator } from "@hono/zod-validatior";
import { z } from 'zod';
import {createAvailability, getAllAvailabilities, softDeleteAvailability, updateAvailability } from "../controllers/availability.controller.js";

