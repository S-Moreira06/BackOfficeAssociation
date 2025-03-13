import reservationService from '../services/reservation.service.js';
import availabilityService from '../services/availability.service.js';

async function createReservation(c) {
    try {
        const data = c.req.valid('json');
        const reservation = await reservationService.createReservation(data);

        return c.json({
            message: "Your reservation has been successfully submitted.",
            reservation
        }, 201);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Reservation failed" }, 400);
    }
}

async function deleteReservation(c) {
    try {
        const id = c.req.param('id');
        const success = await reservationService.deleteReservation(id);

        if (!success) {
            return c.json({ error: "Failed to archive reservation" }, 400);
        }

        return c.json({
            message: "Reservation archived successfully"
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Server error' }, 500);
    }
}

async function getAllReservation(c) {
    try {
        let reservations;
        const availability = c.req.query('id_availability');
        
        if (availability) {
            const response = await getAllReservationByAvailability(c);
            reservations = await response.json();
            console.log("Données reçues de getAllReservationByAvailability :", reservations);
            return c.json({ 
                message: "Filtered reservations by availability",
                reservations
            }, 200);
        } else {
            reservations = await reservationService.getAllReservation();
            return c.json({
                message: "List of all reservations",
                reservations
            }, 200);
        }
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to load reservations" }, 400);
    }
}


async function getReservation(c) {
    try {
        const id = c.req.param('id');
        const reservation = await reservationService.getReservation(id);

        if (!reservation) {
            return c.json({ error: "Reservation not found" }, 404);
        }

        return c.json({
            message: "Reservation details",
            reservation
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to load reservation details" }, 400);
    }
}

async function getTotal(c) {
    try {
        const result = await reservationService.getTotal();
        const total = result?.total || 0;

        return c.json({ total }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "server error", details: error.message }, 500);
    }
}
async function getTotalByName(c) {
    try {
        const name = c.req.param('name');
        const total = await reservationService.getTotalByName(name);

        return c.json({ total }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'server error', details: error.message }, 500);
    }
}
async function getAllReservationByAvailability(c) {
    try {
        const id_availability = c.req.query('id_availability');
        const reservationsByAvailability = await reservationService.getAllReservationByAvailability(id_availability);

        return c.json({ reservationsByAvailability }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'server error', details: error.message }, 500);
    }
}

async function isAcceptedReservation(c) {
    try {
        const id_reservation = c.req.param('id_reservation');
        const id_availability = c.req.param('id_availability');
        const slot = c.req.param('slot');
        const type = c.req.param('type')
        await reservationService.valid(id_reservation);
        await availabilityService.valid(id_availability,slot,type)
        return c.json({
            message: 'Reservation validated'
          }, 201)
    } catch (error) {
        console.error(error);
        return c.json({error: 'validation failed'}, 400)
    }
    
}

export { 
    createReservation, 
    deleteReservation, 
    getAllReservation, 
    getReservation, 
    getTotalByName,
    getTotal,
    getAllReservationByAvailability,
    isAcceptedReservation 
};

