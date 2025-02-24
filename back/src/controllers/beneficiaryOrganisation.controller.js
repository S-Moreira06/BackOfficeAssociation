import beneficiaryOrganisationService from "../services/beneficiaryOrganisation.service.js";
import beneficiaryService from "../services/beneficiary.service.js";

async function linkBeneficiaryToOrganisation(c) {
    try {
        const data = c.req.valid('json');

        if (!data.beneficiary_id || !data.organisation_id) {
            return c.json({ error: "Missing beneficiary_id or organisation_id" }, 400);
        }

        const success = await beneficiaryOrganisationService.createBeneficiaryOrganisation(
            data.organisation_id,
            data.beneficiary_id
        );

        if (success) {
            return c.json({ message: "Beneficiary linked to organisation successfully." }, 201);
        } else {
            return c.json({ error: "Failed to link beneficiary to organisation" }, 500);
        }
    } catch (error) {
        console.error(error);
        return c.json({ error: "Server error" }, 500);
    }
}

async function getBeneficiariesForOrganisation(c) {
    try {
        const organisation_id = c.req.param('id');
console.error(organisation_id)


        const beneficiaries = await beneficiaryOrganisationService.getBeneficiariesForOrganisation(
            organisation_id
        );

        return c.json({
            message: "Get all beneficiaries successfully",
            beneficiaries : beneficiaries
        },201);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to get all beneficiaries" }, 500);
    }
}
async function deleteBeneficiary(c) {
    try {
        const id = c.req.param('id')
        await beneficiaryOrganisationService.deleteBeneficiaryOrganisation(id)
        return c.json({
            message: 'beneficiary deleted.'
        }, 201)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'delete failed' }, 400)
    }
}

export { linkBeneficiaryToOrganisation, getBeneficiariesForOrganisation, deleteBeneficiary };