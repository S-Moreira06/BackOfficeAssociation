import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { useNavigate } from "react-router";

import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Users } from 'lucide-react';

import { getAllAvailabilities } from '@/api/availability'
import GetDate from "@/hooks/get-date"

export default function AvailabilitiesList () {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['availabilitiesList'], queryFn: getAllAvailabilities })
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    console.log(data)

    return (
        <>
        <Button variant="outline" className="mt-2" onClick={()=>navigate("/create-availability")}>Créer une disponibilité</Button>
        <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-1 p-1'>
            {data?.availabilities.length > 0 && data.availabilities.map((availability)=>{
                const price = availability?.price / 100;
                //Vérification et conversion du format de la date (invalid date)
                const [year, month, day] = availability.date.split("-");
                const [hours, minutes] = availability.time_start.split(":");
                //Création de la date avec le bon fuseau horaire
                const dateToCompare = new Date(Date.UTC(year, month - 1, day, hours, minutes));
                //Conversion de deadline_accept en millisecondes
                const deadlineInMs = availability.deadline_accept * 60 * 60 * 1000;
                const adjustedDateToCompare = new Date(dateToCompare.getTime() - deadlineInMs);
                const currentTimestamp = Date.now();
                const showItem = adjustedDateToCompare.getTime() >= currentTimestamp;
                const formattedDate = adjustedDateToCompare.toLocaleString("fr-FR", {
                    timeZone: "Europe/Paris",
                });
                console.log(
                    `ID: ${availability.id}, Date ajustée: ${formattedDate}, Affiché: ${showItem}`
                );
                return showItem ?(
                    <div className="">
                    <Card key={availability.id} onClick={() => navigate("/availability-detail",{ state: { availabilityId: availability.id }})}>
                        <CardHeader>
                            <CardTitle className="text-center">{availability?.name}</CardTitle>
                            <CardDescription>
                                Le <GetDate timestamp={availability?.date}/> de {availability?.time_start} à {availability?.time_end}
                                <p className='italic'>Delai de réservation: {availability?.deadline_accept} heures</p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='flex justify-between'>
                                <p>Places disponibles:</p>
                                <p className='flex justify-between italic'>max {availability?.max_people}<Users size={22} className='self-center pl-1'/></p>
                            </div>
                            
                            <div className='flex justify-around text-center'>
                                <div className=''>
                                    <p>{availability?.on_site}</p>
                                    <p>Sur place</p>
                                </div>
                                <div>
                                    <p>{availability?.take_away}</p>
                                    <p>A emporter</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={(event) => {
                                event.stopPropagation(); // Empêche l'événement de remonter à la card, ici le click
                                navigate("/update-availability", { state: { restaurantId: availability.id } });
                            }}>
                                Modifier
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger  onClick={(event) => event.stopPropagation()}>Supprimer</AlertDialogTrigger>
                                <AlertDialogContent className="bg-white">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Etes vous sure de vouloir supprimer la disponibilité?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Souhaitez vous désactiver la disponibilité?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel  onClick={(event) => event.stopPropagation()}>Annuler</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => mutation.mutate(availability.id)}>Oui</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </Card>
                </div>
            ) : null
            })}
        </div>
        </>
    )

}