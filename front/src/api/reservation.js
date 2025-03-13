import instance from "./config";

async function createReservation(data) {
    return await instance.post("/reservation",data)
}

async function getAllReservationByAvailability(data) {
    // return await instance.post("/reservation",data)
    try {
        const response = await instance.get(`/reservation?id_availability=${data}`)
        return response.data
    } catch (error) {
        return error
    }
}

async function getAllReservation() {
    try {
        const response = await instance.get("/reservation")
        return response.data
    } catch (error) {
        return error
    }
}

async function getReservationById(id) {
    try {
        const response = await instance.get(`/reservation/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}

async function isAcceptedReservation(id,id_availability,slot,type) {
    try {
        const response = await instance.put(`/reservation/accepted/${id}/${id_availability}/${slot}/${type}`)
        return response.data
    } catch (error) {
        return error
    }
}
async function isRefusedReservation(id) {
    try {
        const response = await instance.put(`/reservation/refused/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}
async function isCanceledReservation(id,id_availability,slot,type) {
    try {
        const response = await instance.put(`/reservation/canceled/${id}/${id_availability}/${slot}/${type}`)
        return response.data
    } catch (error) {
        return error
    }
}


export {createReservation, getAllReservationByAvailability, getAllReservation, getReservationById, isAcceptedReservation, isRefusedReservation, isCanceledReservation}