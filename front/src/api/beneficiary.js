import instance from "./config";
import axios from "axios";


async function getAllBeneficiary() {
    try {
        const response = await instance.get("http://localhost:3000/api/beneficiary")
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}

async function getBeneficiary(id) {
    try {
        const response = await instance.get(`/beneficiary/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}

async function updateBeneficiary(id, beneficiaryData) {
    try {
        const response = await instance.put(`/beneficiary/${id}`, beneficiaryData);
        return response.data;
    } catch (error) {
        return error;
    }
}

export { getAllBeneficiary, getBeneficiary, updateBeneficiary }