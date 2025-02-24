import { useLocation } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

import { getUser } from "../api/user"

export default function UpdateUser() {
    const location = useLocation();
    const userId = location.state?.userId; 
    const { isPending, isError, data, error } = useQuery({ queryKey: ['getUser'], queryFn: getUser(userId) })
    useEffect(()=>{
            console.log("DATA", data)
        }, [data])
    
    console.log(userId)

    return (
        <div>Modifier l'utilisateur avec ID : {userId}</div>

    );
}
