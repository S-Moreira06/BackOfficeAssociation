import { Hono } from "hono";
import { linkBeneficiaryToOrganisation, getBeneficiariesForOrganisation } from "../controllers/beneficiaryOrganisation.controller.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const beneficiaryOrganisationRouter = new Hono();

beneficiaryOrganisationRouter.post(
    "/link",
    zValidator(
        "json",
        z.object({
            beneficiary_id: z.number().int(),
            organisation_id: z.number().int(),
        })
    ),
    linkBeneficiaryToOrganisation
);

beneficiaryOrganisationRouter.get(
        "/:id",
        getBeneficiariesForOrganisation
    );

export default beneficiaryOrganisationRouter;