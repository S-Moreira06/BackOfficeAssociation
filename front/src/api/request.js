import instance from "./config";

async function request(data) {
    return await instance.post("request",data)
}

async function getAllRequest() {
    try {
        const response = await instance.get("http://localhost:3000/api/request")
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}
async function getRequest(id) {
    try {
        const response = await instance.get(`http://localhost:3000/api/request/${id}`)
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}


export { request, getAllRequest, getRequest }