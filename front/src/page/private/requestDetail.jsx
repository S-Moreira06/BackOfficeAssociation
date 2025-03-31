import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from "react-router";

import { getRequest, isAcceptedRequest, isRefusedRequest } from "@/api/request"
import GetDate from "@/hooks/get-date"


export default function RequestDetail () {
    const location = useLocation();
    const requestId = location.state?.requestId;
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    console.log("voici l'id ",requestId)
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['requestDetail', requestId], 
        queryFn: () =>getRequest(requestId)
    })
    const acceptedRequestMutation = useMutation({
        mutationFn: async (requestID) => {
            return await isAcceptedRequest(requestID);
        },
        onSuccess: () => {
            console.log("request is accepted !");
            queryClient.invalidateQueries(["requestList"]);
            queryClient.invalidateQueries(['requestDetail', requestId]);
            navigate("/request-list")
        },
        
        onError: (error) => {
            console.log("Erreur lors de la validation de la requete:", error)
        }
    });
    const refusedRequestMutation = useMutation({
        mutationFn: async (requestID) => {
            return await isRefusedRequest(requestID);
        },
        onSuccess: () => {
            console.log("request is refused !");
            queryClient.invalidateQueries(["requestList"]);
            queryClient.invalidateQueries(['requestDetail', requestId]);
            navigate("/request-list")
        },
        
        onError: (error) => {
            console.log("Erreur lors du refus de la requete:", error)
        }
    });
    console.log(data)
    return (
        <>
            <Card className="mx-auto pb-5 w-[80%] rounded-md shadow-2xl">
                <CardHeader>
                    <CardTitle className="mx-5">Requete n° {data?.request.id} <br/> <GetDate timestamp={data?.request.created_at}/></CardTitle>
                    <CardDescription className="mx-10 text-center">{data?.request.category}</CardDescription>
                </CardHeader>
                <CardContent className="mx-10 grid grid-cols-2">
                    <p>Nom : </p>
                    <p className="text-center">{data?.request.name}</p>
                    <Separator className="border"/><Separator className="border"/>

                    <p>Localisation : </p>
                    <div className="text-center">
                        <p>{data?.request.address}</p> 
                        <p>{data?.request.zip} </p>
                        <p>{data?.request.city}</p>
                    </div>
                    <Separator className="border"/><Separator className="border"/>
                    <p>Contact :</p> 
                    <div className="text-center">
                        <p>{data?.request.lastname} {data?.request.firstname}</p> 
                        <p>{data?.request.phone} </p>
                        <p>{data?.request.email} </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="mx-auto">
                        <Button variant="secondary" onClick={() => acceptedRequestMutation.mutate(data?.request.id)}>Valider</Button>
                        <Button variant="outline" onClick={() => refusedRequestMutation.mutate(data?.request.id)}>Refuser</Button>
                    </div>
                </CardFooter>
            </Card>

        </>
    )
}