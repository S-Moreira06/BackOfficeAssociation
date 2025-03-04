import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {createAvailability} from "@/api/availability";


const availabilitySchema = z.object({
    // restaurantId: z.string(),
    // date: z.string(),
    // timeStart: z.string(),
    // timeEnd: z.string(),
    // deadlineAccept: z.string(),
    // onSite: z.string(),
    // takeAway: z.string(),
    // maxPeople: z.string(),
    // price: z.string(),
    // commentary: z.string().max(255).optional()
    restaurantId: z.number().int(),
    date: z.string(),
    timeStart: z.string(),
    timeEnd: z.string(),
    deadlineAccept: z.string(),
    onSite: z.number().int(),
    takeAway: z.number().int(),
    maxPeople: z.number().int(),
    price: z.string(),
    commentary: z.string().max(255).optional()
})

export default function CreateAvailability() {
    const form = useForm({
        resolver: zodResolver(availabilitySchema),
        
    });
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
        // const fdata = {
        //     ...data,
        //     restaurantId: Number(data.restaurantId),
        //     onSite: Number(data.onSite),
        //     takeAway: Number(data.takeAway),
        //     maxPeople: Number(data.maxPeople),
            
        // };
        console.log(data)
        availabilityMutation.mutate(data);
    };

    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md bg-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Créer une disponibilité</CardTitle>
            </CardHeader>
                    <CardContent>
                            <Form {...form}>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="restaurantId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Restaurant</FormLabel>
                                                <FormControl>
                                                    <Input  type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                                                        
                                    
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
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
                                                    <Input {...field} />
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
                                                    <Input {...field} />
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
                                                    <Input {...field} />
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
                                                    <Input  type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
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
                                                    <Input  type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
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
                                                    <Input  type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
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

