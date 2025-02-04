import requestService from '../services/request.service.js'

async function createRequest(c) {
  try {
    const data = c.req.valid('json')
    await requestService.createRequest(data)
    return c.json({
      message: 'Votre demande a bien été envoyée. Un administrateur vous contactera dans les plus brefs delais.'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error : 'request failed'}, 400)
  }
}

async function deleteRequest(c) {
  try {
    const data = c.req.valid('json')
    await requestService.deleteRequest(data)
    return c.json({
      message: 'request archived.'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'non ok' }, 400)
  }
}

async function getAllRequest(c) {
  try {
    const request = await requestService.getAllRequest();
    return c.json({
      message: 'Liste des requetes disponible',
      request: request
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'non ok'}, 400)
  }
}

export {createRequest,deleteRequest, getAllRequest}