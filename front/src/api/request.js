import instance from "./config";

async function request(data) {
    return await instance.post("request",data)
}

async function getAllRequest() {
    try {
        const response = await instance.get("/request")
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}
async function getRequest(id) {
    try {
        const response = await instance.get(`/request/accpted/${id}`)
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}

async function isAcceptedRequest(id) {
    try {
        const response = await instance.get(`/request/${id}`)
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}


export { request, getAllRequest, getRequest, isAcceptedRequest }