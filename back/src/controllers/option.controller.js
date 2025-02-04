import optionService from '../services/option.service.js'
import organisationService from "../services/organisation.service.js";

async function creationOption(c) {
    try {
        const data = c.req.valid('json')
        await optionService.creationOption(data);
        return c.json({
            message: 'option crée avec sucess.'
        }, 201)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'non ok' }, 400)
    }
}
async function deleteOption(c) {
    try {
        const data = c.req.valid('json')
        await optionService.deleteOption(data);
        return c.json({
            message: 'option supprimer avec sucess.'
        }, 201)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'non ok' }, 400)
    }
}
async function getAllOption(c) {
    try {
        const option = await optionService.getAllOption();
        return c.json({
            message: 'Liste option ok.',
            option: option
        }, 200)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'non ok' }, 400)
    }
}

export {creationOption ,deleteOption ,getAllOption} ;