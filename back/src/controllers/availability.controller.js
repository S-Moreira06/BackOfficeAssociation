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
        const availabilityId = c.req.param('id');
        await availabilityService.softDeleteAvailability(availabilityId);
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
            message: 'get all availabilities done',
            availabilities: availabilities
        }, 201)
    } catch (error) {
        console.error(error);
        return c.json({
            error: "get all availabilities failed"
        }, 400)
    }
}

async function getAvailabilityById(c) {
    try {
        const id = c.req.param('id');
        const availability = await availabilityService.getAvailabilityById(id);
        return c.json({
            message: 'get availability details done',
            availability: availability
        }, 201)
    } catch (error) {
        console.error(error);
        return c.json({
            error: "get availability details failed"
        }, 400)
    }
}

async function updateAvailability(c) {
    try {
        const availabilityId = c.req.param('id');
        const data = c.req.valid('json');
        if (!availabilityId || !data) {
            return c.json({ error: 'Missing required fields' }, 400);
        }
        await availabilityService.updateAvailability(availabilityId, data);
        return c.json({
            message: 'Update availability successfull'
        }, 201)
    } catch (error) {
        console.error(error);
        return c.json({error: 'update availability failed'}, 400)
    }
}

export {createAvailability, getAllAvailabilities, updateAvailability, deleteAvailability, getAvailabilityById }