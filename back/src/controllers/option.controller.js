import optionService from '../services/option.service.js'

async function creationOption(c) {
    try {
        const data = c.req.valid('json')
        await optionService.creationOption(data);
        return c.json({
            message: 'option create sucessfully.'
        }, 201)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'option create failed' }, 400)
    }
}
async function deleteOption(c) {
    try {
        const id = c.req.param('id')
        await optionService.deleteOption(id);
        return c.json({
            message: 'option delete with succes.'
        }, 201)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'option delete with failed' }, 400)
    }
}
async function getAllOption(c) {
    try {
        const option = await optionService.getAllOption();
        return c.json({
            message: 'Get all option succes.',
            option: option
        }, 200)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'Get all option failed' }, 400)
    }
}
async function getOption(c) {
    try {
        const id = c.req.param('id');
        const option = await optionService.getOption(id);
        if(!option) {
            return c.json({ error : 'option not found'},404)
        }
        return c.json({
            message: "option informations available",
            option: option
        }, 200)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'option information loading failed'}, 400)
    }
}

export {creationOption ,deleteOption ,getAllOption ,getOption} ;