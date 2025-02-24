import instance from "./config";
import axios from "axios"


async function signIn(data) {
    return await instance.post("/login", data)

}

export { signIn }