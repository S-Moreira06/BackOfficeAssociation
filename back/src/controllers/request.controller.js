import requestService from '../services/request.service.js'

async function request(c) {
  try {
    const data = c.req.valid('json')
    await requestService.request(data)
    return c.json({
      message: 'Votre demande a bien été envoyée. Un administrateur vous contactera dans les plus brefs delais.'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error : 'request failed'}, 400)
  }
}

export {request}