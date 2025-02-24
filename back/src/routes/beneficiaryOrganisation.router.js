import { Hono } from "hono";
import { linkBeneficiaryToOrganisation, getBeneficiariesForOrganisation ,deleteBeneficiary} from "../controllers/beneficiaryOrganisation.controller.js";
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
beneficiaryOrganisationRouter.delete('/:id',deleteBeneficiary);

export default beneficiaryOrganisationRouter;