import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createBeneficiary, deleteBeneficiary, getAllBeneficiary,getAllBeneficiaryByAsso,getBeneficiary, updateBeneficiary} from "../controllers/beneficiary.controller.js";

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
            remark: z.string().min(2).optional()
        })
    ),
    createBeneficiary
);

beneficiaryRouter.put(
    "/:id", zValidator('json',
        z.object({
            firstname: z.string().min(2).optional(),
            lastname: z.string().min(2).optional(),
            address: z.string().min(6).max(300).optional(),
            city: z.string().min(3).max(50).optional(),
            phone: z.string().min(10).max(20).optional(),
            zip: z.string().min(5).max(5).optional()
        })
    ),
    updateBeneficiary
);

beneficiaryRouter.delete(
    "/:id", 
    zValidator('param', 
        z.object(
        {
            id: z.string()
        }
    )), 
    deleteBeneficiary
);

beneficiaryRouter.get('/',getAllBeneficiary);

beneficiaryRouter.get(
    '/:id',
    zValidator(
        'param',
        z.object({
            id: z.string().regex(/^\d+$/),
        })), getBeneficiary
);
beneficiaryRouter.get(
    '/association/:id',
    zValidator(
        'param',
        z.object({
            id: z.string().regex(/^\d+$/),
        })), getAllBeneficiaryByAsso
);

export default beneficiaryRouter;