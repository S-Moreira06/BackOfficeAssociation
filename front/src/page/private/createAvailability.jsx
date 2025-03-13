import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {createAvailability} from "@/api/availability";
import {getAllRestaurant} from "@/api/restaurant";


const availabilitySchema = z.object({
    restaurantId: z.coerce.number().int(),
    date: z.string(),
    timeStart: z.string(),
    timeEnd: z.string(),
    deadlineAccept: z.string(),
    onSite: z.coerce.number().int(),
    takeAway: z.coerce.number().int(),
    maxPeople: z.coerce.number().int(),
    price: z.string(),
    commentary: z.string().max(255).optional()
})

export default function CreateAvailability() {
    const form = useForm({
        resolver: zodResolver(availabilitySchema),
        defaultValues: {
            date: "2025-05-22",
            timeStart: "11:00:00",
            timeEnd: "15:00:00",
            deadlineAccept: "12",
            onSite: 15,
            takeAway: 15,
            maxPeople: 2,
            price: "19.90",
            commentary: "Repas d'aniversaire du patron"
        },
    });
    const { isPending, isError, data, error } = useQuery({ queryKey: ['restaurantSelect'], queryFn: getAllRestaurant })


    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { handleSubmit, setValue } = form;
    const availabilityMutation = useMutation({
        mutationFn: async (newData) => {
            return await createAvailability(newData);
        },
        onSuccess: () => {
            console.log("availability is create !");
            queryClient.invalidateQueries(['availabilityList']);
            setTimeout(() => {
                navigate("/availability-list");
            }, 500); 
        },
        
        onError: (error) => {
            console.log("Erreur lors de la création :", error)
        }
    });

    const onSubmit = (data) => {
        console.log(data)
        availabilityMutation.mutate(data);
    };

    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[80%] my-5 max-w-xl bg-white shadow-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Créer une disponibilité</CardTitle>
            </CardHeader>
                <CardContent>
                        
                            <Form {...form}>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                                    
                                    <FormField 
                                        control={form.control}
                                        name="restaurantId"
                                        render={({ field }) => {
                                            const selectedRestaurant = data?.organisations.find((r) => r.id === Number(field.value));

                                            return (
                                                <FormItem>
                                                    <FormLabel>Restaurant</FormLabel>
                                                    <Select 
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                        }} 
                                                        value={field.value} // Stock l'ID du restau sélectionné
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue  />
                                                            {selectedRestaurant?.name || "Choisissez un restaurant"}
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white">
                                                            {data?.organisations?.map((restaurant) => (
                                                                <SelectItem key={restaurant.id} value={restaurant.id}>
                                                                    {restaurant.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                    
                                    <div className="grid sm:grid-cols-2 gap-3">
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="date"/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                        <FormField
                                            control={form.control}
                                            name="deadlineAccept"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Delai mini. de réservation</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} type="number"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    
                                    <FormField
                                        control={form.control}
                                        name="timeStart"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Heure de début</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="time"/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="timeEnd"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Heure de fin</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="time"/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="onSite"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Sur place</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="number"/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="takeAway"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>A emporté</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="number"/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="maxPeople"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre de personne max / reservation</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="number"/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prix</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="commentary"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Commentaire</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <Button type="submit">Créer une disponibilité</Button>
                                </form>
                            </Form>
                </CardContent>

        </Card>
    </div>
        </>
    )
}

