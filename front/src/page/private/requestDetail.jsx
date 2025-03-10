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

import { getRequest } from "@/api/request"
import GetDate from "@/hooks/get-date"


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
                        <Button variant="secondary">Valider</Button><Button variant="outline">Refuser</Button>
                    </div>
                </CardFooter>
            </Card>

        </>
    )
}