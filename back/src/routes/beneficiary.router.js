import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createBeneficiary, deleteBeneficiary, getAllBeneficiary, getBeneficiary } from "../controllers/beneficiary.controller.js";

const beneficiaryRouter = new Hono()

beneficiaryRouter.post(
    "/", zValidator('json',
        z.object({
            firstname: z.string().min(2),
            lastname: z.string().min(2),
            address: z.string().min(2),
            zip: z.string().min(5).max(6).regex(/^\d+$/, "Le champ doit contenir uniquement des chiffres"),
            city: z.string().min(2),
            phone: z.string().min(2).regex(/^\d+$/, "Le champ doit contenir uniquement des chiffres"),
            remark: z.string().min(2)
        })
    ),
    createBeneficiary
);

beneficiaryRouter.delete(
    "/", 
    zValidator('json', 
        z.object(
        {
            id: z.string()
        }
    )), 
    deleteBeneficiary
);

beneficiaryRouter.get('/',getAllBeneficiary);

beneficiaryRouter.get(
    "/", 
    zValidator('json', 
        z.object(
        {
            id: z.string()
        }
    )), 
    getBeneficiary
);

export default beneficiaryRouter;