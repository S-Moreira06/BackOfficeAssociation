import typeOrganisationService from "../services/typeOrganisation.service.js";

async function createTypeOrganisation(c){
    try {
        const idOrganisation = c.req.param('idOrganisation');
        const idType =  c.req.param('idType');
        await typeOrganisationService.createTypeOrganisation(idType, idOrganisation);
        return c.json({
            message: "create typeOrganisation sucessfully."
        }, 201)
    } catch {
        console.error(error)
        return c.json({ error: 'create tytypeOrganisationpe failed' }, 400)
    }
}

async function deleteTypeOrganisation(c) {
    try {
        const id= c.req.param('id')
        await typeOrganisationService.deleteTypeOrganisation(id);
        return c.json({
            message : 'typeOrganisation deleted succesfully.'
        }, 201)
    } catch (error) {
        console.error(error);
        return c.json({
            error : 'typOrganisation deleted failed'
        }, 400)
    }
}

async function getAllTypeOrganisationFromOrganisationId(c) {
    try {
        const idOrganisation= c.req.param('idOrganisation');
        await typeOrganisationService.getAllTypeOrganisationFromOrganisationId(idOrganisation);
        return c.json({
            message: 'get all types for Organisation succesfully'
        }, 201)
    } catch (error) {
        console.error(error);
        return c.json({
            error: 'get all types for Organisation failed'
        }, 400)
    }
}

export { createTypeOrganisation, getAllTypeOrganisationFromOrganisationId, deleteTypeOrganisation}