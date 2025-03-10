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

import { getAvailabilityById } from "@/api/availability"
import GetDate from "@/hooks/get-date"

export default function AvailabilityDetail () {
    const location = useLocation();
    const availabilityId = location.state?.availabilityId;
    console.log("voici l'id ",availabilityId)
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['availabilityDetail', availabilityId], 
        queryFn: () =>getAvailabilityById(availabilityId)
    })
    return (
        <>
        <Card className="mx-auto pb-5 w-[80%] rounded-md shadow-2xl">
                        <CardHeader>
                            <CardTitle className="mx-5">Disponibilité n° {data?.availability.id} <br/> <GetDate timestamp={data?.availability.created_at}/></CardTitle>
                            <CardDescription className="mx-10 text-center">{data?.availability.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="mx-10 grid grid-cols-2">
                            <p>Date : </p>
                            <p className="text-center">{data?.availability.date}</p>
                            <Separator className="border"/><Separator className="border"/>
        
                            <p>Heures : </p>
                            <div className="text-center">
                                <p>{data?.availability.time_start}</p> 
                                <p>{data?.availability.time_end} </p>
                                <p>{data?.availability.deadline_accept}</p>
                            </div>
                            <Separator className="border"/><Separator className="border"/>
                            <p>couverts :</p> 
                            <div className="text-center">
                                <p>{data?.availability.on_site} {data?.availability.take_away}</p> 
                                <p>{data?.availability.max_people} </p>
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
