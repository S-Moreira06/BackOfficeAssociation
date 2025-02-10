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
        return c.json({ error : 'reservation failed'}, 400)
    }
};

async function deleteReservation(c) {
  try {
    const id = c.req.param('id')
    await reservationService.deleteReservation(id)
    return c.json({
      message: ' reservation archived'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'archiving failed' }, 400)
  }
};

async function getAllReservation(c) {
  try {
    const reservation = await reservationService.getAllReservation();
    return c.json({
      message: 'Liste des réservation disponible',
      reservation: reservation
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'reservation list loading fail'}, 400)
  }
}

export {createReservation, deleteReservation, getAllReservation}