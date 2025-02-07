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
            message: 'option deleted succesfully.'
        }, 201)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'option deleted failed' }, 400)
    }
}
async function getAllOption(c) {
    try {
        const option = await optionService.getAllOption();
        return c.json({
            message: 'Get all option succesfully.',
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
            message: "get option informations succesfully",
            option: option
        }, 200)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'get option information  failed'}, 400)
    }
}

export {creationOption ,deleteOption ,getAllOption ,getOption} ;