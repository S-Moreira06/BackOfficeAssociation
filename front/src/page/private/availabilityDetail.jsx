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
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

import GetDate from "@/hooks/get-date"
import { getAvailabilityById } from "@/api/availability"
import CreateReservation from "@/page/private/createReservation";

export default function AvailabilityDetail () {
    const location = useLocation();
    const availabilityId = location.state?.availabilityId;
    const [open, setOpen] = useState(false);
    
    console.log("voici l'id ",availabilityId)
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['availabilityDetail', availabilityId], 
        queryFn: () =>getAvailabilityById(availabilityId)
    })
    return (
        <>
        <Card className="mx-auto pb-5 rounded-md shadow-2xl w-3/4">
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
                            <p>Couverts :</p> 
                            <div className="text-center">
                                <p>Sur place: {data?.availability.on_site} / A emporter: {data?.availability.take_away}</p> 
                                <p>Couverts max.: {data?.availability.max_people} </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="mx-auto">
                            <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="secondary">Réserver</Button>
                            </SheetTrigger>
                            <SheetContent side="right" >
                                <CreateReservation availabilityId={availabilityId} closeSheet={() => setOpen(false)} className="w-[500px]" />
                            </SheetContent> 
                            </Sheet>
                            </div>
                        </CardFooter>
                    </Card>
        
                </>
    )
}
