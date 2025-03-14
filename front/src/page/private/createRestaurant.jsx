'use client'

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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { createRestaurant } from "@/api/restaurant"

const restaurantSchema = z.object({
    name: z.string(),
    address: z.string(),
    zip: z.string(),
    city: z.string(),
    siret: z.string(),
    contact: z.string(),
    email: z.string().email(),
    phone: z.string(),
    max_meal: z.number().nullable().optional(),
    description: z.string().optional(),
    image: z.string().optional()
});

export default function CreateRestaurant() {
    const form = useForm({
        resolver: zodResolver(restaurantSchema),
            defaultValues: {
            name: "Restau Test",
            address: "1 rue su test",
            zip: "06000",
            city: "Nice",
            siret: "123456788098",
            contact: "Jean Test",
            email: "jeantest@test.fr",
            phone: "0706060606",
            max_meal: 99,
            description: "Ceci est une restaurant de test",
            image: "",
            role: "restaurant"
        },
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const { handleSubmit, setValue } = form;

    const restaurantMutation = useMutation({
        mutationFn: async (newData) => {
            return await createRestaurant(newData);
        },
        onSuccess: () => {
            console.log("restaurant is create !");
            queryClient.invalidateQueries(['restaurantList']);
            setTimeout(() => {
                navigate("/restaurant-list");
            }, 500); // Petite pause pour s'assurer que tout est bien exécuté
        },
        
        onError: (error) => {
            console.log("Creation failed :", error)
        }
    });

    const onSubmit = (data) => {
        console.log(data)
        restaurantMutation.mutate(data);
    };

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md bg-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Créer une restaurant</CardTitle>
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
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <input type="hidden" {...field} value="restaurant" />
                                        )}
                                    />
                                    
                                    <Button type="submit">Créer un restaurant</Button>
                                </form>
                            </Form>
                        </CardContent>

        </Card>
    </div>
    );
}
