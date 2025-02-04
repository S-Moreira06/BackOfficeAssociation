import reservationService from '../services/reservation.service.js';

async function createReservation(c) {
    try {
        const data = c.req.valid('json')
            await reservationService.createReservation(data)
            return c.json({
              message: 'Votre reservation a bien été envoyée. Le restaurateur confirmera ces repas les plus brefs delais.'
            }, 201)
    } catch (error) {
        console.error(error)
        return c.json({ error : 'request failed'}, 400)
    }
}

export {createReservation}