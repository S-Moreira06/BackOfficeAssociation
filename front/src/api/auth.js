import instance from "./config";
import axios from "axios"


async function signIn(data) {
    return await instance.post("/auth/login", data)

}

export { signIn }