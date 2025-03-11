import reservationService from '../services/reservation.service.js';

async function createReservation(c) {
    try {
        const data = c.req.valid('json');
        const reservation = await reservationService.createReservation(data);

        return c.json({
            message: 'Votre réservation a bien été envoyée.',
            reservation
        }, 201);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Échec de la réservation' }, 400);
    }
}

async function deleteReservation(c) {
    try {
        const id = c.req.param('id');
        const success = await reservationService.deleteReservation(id);

        if (!success) {
            return c.json({ error: 'Échec de l’archivage' }, 400);
        }

        return c.json({
            message: 'Réservation archivée'
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Erreur serveur' }, 500);
    }
}

async function getAllReservation(c) {
    try {
        const reservations = await reservationService.getAllReservation();
        return c.json({
            message: 'Liste des réservations disponibles',
            reservations
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Échec du chargement des réservations' }, 400);
    }
}

async function getReservation(c) {
    try {
        const id = c.req.param('id');
        const reservation = await reservationService.getReservation(id);

        if (!reservation) {
            return c.json({ error: 'Réservation introuvable' }, 404);
        }

        return c.json({
            message: "Informations de la réservation",
            reservation
        }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Échec du chargement des informations' }, 400);
    }
}

async function getTotal(c) {
    try {
        const result = await reservationService.getTotal();
        const total = result?.total || 0;

        return c.json({ total }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Erreur serveur', details: error.message }, 500);
    }
}
async function getTotalByName(c) {
    try {
        const name = c.req.param('name');
        const total = await reservationService.getTotalByName(name);

        return c.json({ total }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Erreur serveur', details: error.message }, 500);
    }
}
async function getAllReservationByAvailability(c) {
    try {
        const id_availability = c.req.query('id_availability');
        const reservationsByAvailability = await reservationService.getAllReservationByAvailability(id_availability);

        return c.json({ reservationsByAvailability }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Erreur serveur', details: error.message }, 500);
    }
}

export { createReservation, deleteReservation, getAllReservation, getReservation, getTotalByName ,getTotal ,getAllReservationByAvailability };

