import { useLocation, useNavigate } from "react-router-dom";
import { useQuery , useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { getRestaurant, updateRestaurant } from "@/api/restaurant";

const restaurantSchema = z.object({
    name: z.string(),
    address: z.string(),
    zip: z.string(),
    city: z.string(),
    siret: z.string(),
    contact: z.string(),
    email: z.string().email(),
    phone: z.string(),
    maxMeal: z.number().nullable().optional(),
    description: z.string().optional(),
    image: z.string().optional()
})

export default function UpdateRestaurant () {
    const location = useLocation();
    const restaurantId = location.state?.restaurantId; 
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    

    const form = useForm({
        resolver: zodResolver(restaurantSchema),
        defaultValues: {
            name: "",
            address: "",
            zip: "",
            city: "",
            siret: "",
            contact: "",
            email: "",
            phone: "",
            maxMeal: "",
            description: "",
            image: ""
        },
    });
    const { handleSubmit, setValue, reset } = form;
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['getRestaurant' , restaurantId], 
        queryFn: () => getRestaurant(restaurantId),
        enabled: !!restaurantId,
    });
    console.log("Données recues:", data);
    useEffect(() => {
        if (data?.organisation) {
            console.log("Données chargées dans le formulaire", data.organisation);
            reset(data.organisation);
        }
    }, [data?.organisation, reset]);

    const updateRestaurantMutation = useMutation({
        mutationFn: async (newData) => {
            return await updateRestaurant(restaurantId, newData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['restaurantList']);
            setTimeout(() => {
                navigate("/restaurant-list");
            }, 500); 
        },
        onError: (error) => {
            console.log("update failed :", error)
        },
    });

    const onSubmit = (formData) => {
        console.log("Données mises à jour :", formData);
        updateRestaurantMutation.mutate(formData);
    };

    if (isPending) return <div>Chargement...</div>;
    if (isError) return <div>Erreur : {error.message}</div>;

    return (
        <>
                    <div>Modifier le restaurant avec ID : {restaurantId}</div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Modifier le restaurant</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nom</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                                                        
                                    
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Adresse</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="zip"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Code postal</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ville</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="siret"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>SIRET</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="contact"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Téléphone</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <Button type="submit">Mettre à jour</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </>
    )
}
