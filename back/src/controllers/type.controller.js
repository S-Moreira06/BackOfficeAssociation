import typeService from '../services/type.service.js'
import availabilityService from "../services/availability.service.js";

async function creationType(c) {
    try {
        const data = c.req.valid('json')
        await typeService.creationType(data);
        return c.json({
            message: 'type type sucessfully.'
        }, 201)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'type type failed' }, 400)
    }
}
async function deleteType(c) {
    try {
        const id = c.req.param('id')
        await typeService.deleteType(id);
        return c.json({
            message: 'type deleted succesfully.'
        }, 201)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'type deleted failed' }, 400)
    }
}
async function getAllType(c) {
    try {
        const type = await typeService.getAllType();
        return c.json({
            message: 'Get all type succesfully.',
            type: type
        }, 200)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'Get all type failed' }, 400)
    }
}
async function getType(c) {
    try {
        const id = c.req.param('id');
        const type = await typeService.getType(id);
        if(!type) {
            return c.json({ error : 'type not found'},404)
        }
        return c.json({
            message: "get type informations succesfully",
            type: type
        }, 200)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'get type information  failed'}, 400)
    }
}
async function updateType(c) {
    try {
        const typeId = c.req.param('id');
        const data = c.req.valid('json');
        if (!typeId || !data) {
            return c.json({ error: 'Missing required fields' }, 400);
        }
        await typeService.updateType(typeId, data);
        return c.json({
            message: 'update type done'
        }, 201)
    } catch (error) {
        console.error(error);
        return c.json({error: 'update type failed'}, 400)
    }
}

export {creationType ,deleteType ,getAllType ,getType,updateType} ;