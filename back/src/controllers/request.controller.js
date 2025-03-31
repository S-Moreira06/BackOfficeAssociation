import requestService from '../services/request.service.js'

async function createRequest(c) {
  try {
    const data = c.req.valid('json')
    await requestService.createRequest(data)
    return c.json({
      message: 'request valid'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error : 'request failed'}, 400)
  }
}

async function deleteRequest(c) {
  try {
    const data = c.req.valid('param')
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
      message: 'request list available',
      request: request
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'non ok'}, 400)
  }
}

async function getRequest(c) {
  try {
      const id = c.req.param('id');
      const request = await requestService.getRequest(id);
      if(!request) {
        return c.json({ error : 'request not found'},404)
      }
      return c.json({
          message: "request informations available",
          request: request
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'request information loading failed'}, 400)
  }
}

async function isAcceptedRequest(c) {
    try {
        const id_request = c.req.param('id_request');
        await requestService.validedRequest(id_request);
        return c.json({
            message: 'Request validated'
          }, 201)
    } catch (error) {
        console.error(error);
        return c.json({error: 'request validation failed'}, 400)
    }
    
}

async function isRefusedRequest(c) {
    try {
      const id_request = c.req.param('id_request');
      await requestService.refusedRequest(id_request);
        return c.json({
            message: 'Request refused'
        }, 201)
    } catch (error) {
        console.error(error);
        return c.json({error: 'refuse failed'}, 400)
    }
}

export {createRequest,deleteRequest, getAllRequest, getRequest, isAcceptedRequest, isRefusedRequest}