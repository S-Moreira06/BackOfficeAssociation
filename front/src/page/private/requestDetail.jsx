import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from "react-router-dom";

import { getRequest } from "@/api/request"


export default function RequestDetail () {
    const location = useLocation();
    const requestId = location.state?.requestId;
    console.log("voici l'id ",requestId)
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['requestDetail', requestId], 
        queryFn: () =>getRequest(requestId)
 
    })
    console.log(data)
    return (
        <>
            <p>{data?.request.name}</p>
        </>
    )
}