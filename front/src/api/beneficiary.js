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

export { getAllBeneficiary }