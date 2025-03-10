import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";



import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { getAvailabilityById } from "@/api/availability"
import { getAllAssociation } from "@/api/association"
import { createReservation } from "@/api/reservation";

const availabilitySchema = z.object({
    id_organisation: z.coerce.number().int(),
    id_availability: z.number().int(),
    time: z.string(),
    email: z.string(),
    nb_place_setting: z.string(),
    status: z.string(),
    take_away: z.coerce.string()
})

export default function CreateReservation () {
    
    const location = useLocation();
    const availabilityId = location.state?.availabilityId;

    const { isPending: isAvailabilityLoading, isError: isAvailabilityError, data: availabilityData, error: availabilityError } = useQuery({
        queryKey: ['availabilityDetail', availabilityId],
        queryFn: () => getAvailabilityById(availabilityId),
        enabled: !!availabilityId ,
        
    });
    const { isPending: isAssociationsLoading, isError: isAssociationsError, data: associationsData, error: associationsError } = useQuery({
        queryKey: ['associationList'], 
        queryFn: getAllAssociation
    });

    function getHours(time) {
        return Number(time.split(':')[0]);    // separe chaque element d'un string séparé par la valeur entre parentheses et les placent dans un array
    }
    function getMinutes(time) {
        return Number(time.split(":")[1]);
    }

    const timeSlot = [];
    if (availabilityData?.availability) {
        let startHour = getHours(availabilityData.availability.time_start);
        let startMinute = getMinutes(availabilityData.availability.time_start);
        const endHour = getHours(availabilityData.availability.time_end);
        const endMinute = getMinutes(availabilityData.availability.time_end);
// dans la boule si dessous , creer notre tableau timeslot qui sera notre liste de valeurs a afficher. 
        while (startHour < endHour || (startHour === endHour && startMinute <= endMinute)) { // on compare dabord les heures et si elles sont egales on passe aux minutes
            timeSlot.push(`${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}`); // on ajoute la valeur a notre array en s'assurant que ce soit par exemple 01H00 et pas 1h00
            startMinute += 30; // ici c'est la durée de nos plages de reservation , a changer si necessaire
            if (startMinute === 60) {// condition pour passer a l'heure suivante si les minutes sont a 60
                startMinute = 0;
                startHour++;
            }
        }
    }

    const form = useForm({
        resolver: zodResolver(availabilitySchema),
            defaultValues: {
                id_availability: availabilityId,
                time: "",
                email: "",
                nb_place_setting: 1,
                status: "en attente",
                take_away: 0
            },
        });
    
    const navigate = useNavigate();

    const reservationMutation = useMutation({
        mutationFn: async (newData) => {
            return await createReservation(newData);
        },
        onSuccess: () => {
            console.log("reservation is create !");
            // queryClient.invalidateQueries(['associationList']); a remplacer par reservationList quand ce sera créer
            setTimeout(() => {
                navigate("/availability-detail",{ state: { availabilityId: availabilityId }});
            }, 500); 
        },
        
        onError: (error) => {
            console.log("Erreur lors de la création :", error)
        }
    });

    const onSubmit = (data) => {
        data.time = availabilityData.availability.date + " " + data.time;
        console.log("données envoyés:" , data.time)
        reservationMutation.mutate(data)
    };
    return (
        <>
        <Card>
            <CardHeader>

            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
                    <FormField 
                        control={form.control}
                        name="id_organisation"
                        render={({ field }) => {
                            const selectedAssociation = associationsData?.organisations.find((r) => r.id === Number(field.value));
                            return (
                                <FormItem>
                                <FormLabel>Organisation</FormLabel>
                                <Select 
                                    onValueChange={(value) => {
                                    field.onChange(value);
                                    }} 
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue  />
                                        {selectedAssociation?.name || "Choisissez une association"}
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {associationsData?.organisations?.map((association) => (
                                            <SelectItem key={association.id} value={association.id}>{association.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>

                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="id_availability"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Disponibilité</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Heure</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionnez une heure" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {timeSlot.map((time) => (
                                            <SelectItem key={time} value={time}>
                                                {time}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="nb_place_setting"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de couverts</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" max={availabilityData?.availability.max_people}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Statut</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="take_away"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">SP/AE:</FormLabel>
                                <FormDescription>
                                Les repas seront ils récupérés...
                                </FormDescription>
                            </div>
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                <span className="text-gray-700">À emporter</span>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                <span className="text-gray-700">Sur place</span>
                                </div>
                            </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Créer une reservation</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        </>
    )
}