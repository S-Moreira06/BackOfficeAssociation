import availabilityService from "../services/availability.service.js";

async function createAvailability(c) {
    try {
        const data = c.req.valid('json');
        await availabilityService.createAvailability(data);
        return c.json({
            message: 'add new availability done'
        }, 201)
    } catch(error) {
        console.error(error);
        return c.json({
            error: 'add new availability failed'
        }, 400)
    }
}

async function deleteAvailability(c) {
    try {
        const data = c.req.valid('json');
        await availabilityService.softDeleteAvailability(data);
        return c.json({
            message: "delete availability done"
        }, 201);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'delete availability failed'}, 400);
    }
}

async function getAllAvailabilities(c) {
    try {
        const availabilities = await availabilityService.getAllAvailabilities();
        return c.json({
            message: 'get all availabilities done'
        }, 201)
    } catch (error) {
        console.error(error);
        return c.json({
            error: "get all availabilities failed"
        }, 400)
    }
}

async function updateAvailability(c) {
    try {
        const data = c.req.valid('json');
        await availabilityService.updateAvailability(data.id, data);
        return c.json({
            message: 'update availability done'
        }, 201)
    } catch (error) {
        console.error(error);
        return c.json({error: 'update availability failed'}, 400)
    }
}

export {createAvailability, getAllAvailabilities, updateAvailability, deleteAvailability }