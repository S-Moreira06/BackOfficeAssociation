import instance from "./config";

async function createReservation(data) {
    return await instance.post("/reservation",data)
}

export {createReservation}