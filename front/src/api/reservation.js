import instance from "./config";

async function createReservation(data) {
    return await instance.post("/reservation",data)
}

async function getAllReservationByAvailability(data) {
    return await instance.post("/reservation",data)
    try {
        const response = await instance.get(`/reservation?id_availability=${data}`)
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}

async function getAllReservation() {
    try {
        const response = await instance.get("/reservation")
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}

async function getReservationById(id) {
    try {
        const response = await instance.get(`/reservation/${id}`)
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}

export {createReservation, getAllReservationByAvailability, getAllReservation, getReservationById}