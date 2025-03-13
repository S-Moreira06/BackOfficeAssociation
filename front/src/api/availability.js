import instance from "./config";

async function createAvailability(data) {
    return await instance.post("/availability",data);
}
async function getAllAvailabilities() {
    try {
        const response = await instance.get("/availability")
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}
async function getAvailabilityById(id) {
    try {
        const response = await instance.get(`/availability/${id}`)
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}

export { createAvailability, getAllAvailabilities, getAvailabilityById }