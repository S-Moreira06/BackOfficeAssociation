import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

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
    console.log("id de la dispo:" , availabilityId)
    const { isPending: isAvailabilityLoading, isError: isAvailabilityError, data: availabilityData, error: availabilityError } = useQuery({
        queryKey: ['availabilityDetail', availabilityId],
        queryFn: () => getAvailabilityById(availabilityId),
        enabled: !!availabilityId // Ne lance la requête que si availabilityId existe
    });
    const { isPending: isAssociationsLoading, isError: isAssociationsError, data: associationsData, error: associationsError } = useQuery({
        queryKey: ['associationList'], 
        queryFn: getAllAssociation
    });
    console.log("asso data:" ,associationsData)
    const form = useForm({
        resolver: zodResolver(availabilitySchema),
            defaultValues: {
                id_availability: availabilityId,
                time: "",
                email: "",
                nb_place_setting: "1",
                status: "en attente",
                take_away: 0
            },
        });
    
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { handleSubmit, setValue } = form;
    const reservationMutation = useMutation({
        mutationFn: async (newData) => {
            return await createReservation(newData);
        },
        onSuccess: () => {
            console.log("reservation is create !");
            // queryClient.invalidateQueries(['associationList']);
            setTimeout(() => {
                navigate("/availability-detail");
            }, 500); 
        },
        
        onError: (error) => {
            console.log("Erreur lors de la création :", error)
        }
    });

    const onSubmit = (data) => {
        console.log("données envoyés:" , data)
        reservationMutation.mutate(data)
    };
    return (
        <>
        <Card>
            <CardHeader>

            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
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
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    /><FormField
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
                    /><FormField
                    control={form.control}
                    name="nb_place_setting"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de couverts</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    /><FormField
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
                            <FormItem>
                                <FormLabel>A emporté</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
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