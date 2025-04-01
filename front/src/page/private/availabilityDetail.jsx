import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

import GetDate from "@/hooks/get-date";
import GetDateTime from "@/hooks/get-date-time";
import { getAvailabilityById } from "@/api/availability";
import { getAllReservationByAvailability, isAcceptedReservation, isRefusedReservation, isCanceledReservation} from '@/api/reservation';
import CreateReservation from "@/page/private/createReservation";
import ReusableSheet from "@/components/private/sheet"


export default function AvailabilityDetail () {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const availabilityId = location.state?.availabilityId;
    const [open, setOpen] = useState(false);
    
    const { isPending: isReservationLoading, isError: isReservationError, data: reservationData, error: reservationError } = useQuery({ 
        queryKey: ['reservationByAvailabilityList'], 
        queryFn: () =>getAllReservationByAvailability(availabilityId),
        enabled: !!availabilityId 
    })
    
    const { isPending: isAvailabilityLoading, isError: isAvailabilityError, data: availabilityData, error: availabilityError  } = useQuery({ 
        queryKey: ['availabilityDetail', availabilityId], 
        queryFn: () =>getAvailabilityById(availabilityId),
        enabled: !!availabilityId
    })
    const acceptedReservationMutation = useMutation({
        mutationFn: async ({ reservationId, availabilityId, nbPlaceSetting, loc }) => {
            return await isAcceptedReservation(reservationId, availabilityId, nbPlaceSetting, loc);
        },
        onSuccess: () => {
            console.log("reservation is accepted !");
            queryClient.invalidateQueries(['reservationByAvailabilityList']);
            queryClient.invalidateQueries(["reservationList"]);
            queryClient.invalidateQueries(['availabilityDetail', availabilityId]);
        },
        
        onError: (error) => {
            console.log("Erreur lors de la validation :", error)
        }
    });
    const refusedReservationMutation = useMutation({
        mutationFn: async (id) => {
            return await isRefusedReservation(id);
        },
        onSuccess: () => {
            console.log("reservation is refused !");
            queryClient.invalidateQueries(['reservationByAvailabilityList']);
            queryClient.invalidateQueries(["reservationList"]);
        },
        
        onError: (error) => {
            console.log("Erreur lors du refus de la réservation :", error)
        }
    });
    const canceledReservationMutation = useMutation({
        mutationFn: async ({ reservationId, availabilityId, nbPlaceSetting, loc }) => {
            return await isCanceledReservation(reservationId, availabilityId, nbPlaceSetting, loc);
        },
        onSuccess: () => {
            console.log("reservation is canceled !");
            queryClient.invalidateQueries(['reservationByAvailabilityList']);
            queryClient.invalidateQueries(["reservationList"]);
            queryClient.invalidateQueries(['availabilityDetail', availabilityId]);
        },
        
        onError: (error) => {
            console.log("Erreur lors de l'annulation :", error)
        }
    });
    console.log("data :" , availabilityData)
    return (
        <>
        <Button onClick={()=>navigate(-1)} >Retour a la liste</Button>
        <Card className="mx-auto pb-5 rounded-md shadow-2xl w-3/4">
                        <CardHeader>
                            <CardTitle className="mx-5">
                                Restaurant {availabilityData?.availability.name} - Disponibilité du <GetDate timestamp={availabilityData?.availability.date}/> 
                            </CardTitle>
                            <CardDescription className="mx-10 text-center">{availabilityData?.availability.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="mx-10 grid grid-cols-2">
                            <p>Date : </p>
                            <p className="text-center">{availabilityData?.availability.date}</p>
                            <Separator className="border"/><Separator className="border"/>
                            <p>Heures : </p>
                            <div className="text-center">
                                <p>{availabilityData?.availability.time_start}</p> 
                                <p>{availabilityData?.availability.time_end} </p>
                                <p>{availabilityData?.availability.deadline_accept}</p>
                            </div>
                            <Separator className="border"/><Separator className="border"/>
                            <p>Couverts :</p> 
                            <div className="text-center">
                                <p>Sur place: {availabilityData?.availability.on_site} / A emporter: {availabilityData?.availability.take_away}</p> 
                                <p>Couverts max.: {availabilityData?.availability.max_people} </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="mx-auto">
                                <ReusableSheet triggerText="Réserver un table" side="right">
                                <CreateReservation availabilityId={availabilityId} closeSheet={() => setOpen(false)} className="w-[500px]" />
                                </ReusableSheet>
                            </div>
                        </CardFooter>
                    </Card>
                    <Table>
                        <TableCaption className="caption-top text-xl">
                            Liste des réservations
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Association</TableHead>
                                <TableHead>Horraires</TableHead>
                                <TableHead>Nombre de couverts</TableHead>
                                <TableHead>A emporté?</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Commentaire</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {reservationData?.reservations.reservationsByAvailability.length > 0 && reservationData.reservations.reservationsByAvailability.map((reservation)=>{
                        return (
                            <TableRow key={reservation.id}>
                            <TableCell>{reservation?.organisation_name}</TableCell>
                            <TableCell><GetDateTime timestamp={reservation?.time}/></TableCell>
                            <TableCell>{reservation?.nb_place_setting}</TableCell>
                            <TableCell>{reservation?.take_away === 0 || reservation?.take_away === false ? "Sur place":"A emporter" }</TableCell>
                            <TableCell>{reservation?.status}</TableCell>
                            <TableCell>{reservation?.commentary}</TableCell>
                            {reservation.status === "accepted" ?(
                                <TableCell>
                                    <AlertDialog>
                                        <AlertDialogTrigger>Annuler</AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Etes vous sure de vouloir annuler la réservation?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Souhaitez vous annuler la réservation?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Non</AlertDialogCancel>
                                                <AlertDialogAction
                                                onClick={() => canceledReservationMutation.mutate({
                                                    reservationId: reservation.id,
                                                    availabilityId: reservation.id_availability,
                                                    nbPlaceSetting: reservation.nb_place_setting,
                                                    loc: reservation.take_away === 0 || reservation?.take_away === false ? "on_site" : "take_away"
                                                })}
                                            >
                                                    Oui
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            ):reservation.status === "refused" ?(
                                <TableCell>
                                    <AlertDialog>
                                    <AlertDialogTrigger>Accepter</AlertDialogTrigger>
                                    <AlertDialogContent className="bg-white">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Etes vous sure de vouloir accepter la réservation?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Souhaitez vous accepter la réservation?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => acceptedReservationMutation.mutate({
                                                    reservationId: reservation.id,
                                                    availabilityId: reservation.id_availability,
                                                    nbPlaceSetting: reservation.nb_place_setting,
                                                    loc: reservation.take_away === 0 ? "on_site" : "take_away"
                                                })}
                                            >
                                                Oui
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                            ):(
                            <><TableCell>
                                <AlertDialog>
                                    <AlertDialogTrigger>Accepter</AlertDialogTrigger>
                                    <AlertDialogContent className="bg-white">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Etes vous sure de vouloir accepter la réservation?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Souhaitez vous accepter la réservation?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => acceptedReservationMutation.mutate({
                                                    reservationId: reservation.id,
                                                    availabilityId: reservation.id_availability,
                                                    nbPlaceSetting: reservation.nb_place_setting,
                                                    loc: reservation.take_away === 0 ? "on_site" : "take_away"
                                                })}
                                            >
                                                Oui
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                            <TableCell>
                                <AlertDialog>
                                    <AlertDialogTrigger>Refuser</AlertDialogTrigger>
                                    <AlertDialogContent className="bg-white">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Etes vous sure de vouloir refuser la réservation?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Souhaitez vous refuser la réservation?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => refusedReservationMutation.mutate(reservation.id)}>Oui</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell></>
                            )}
                            </TableRow>
                        )
                        })}
                        </TableBody>
                    
                    </Table>
                </>
    )
}
