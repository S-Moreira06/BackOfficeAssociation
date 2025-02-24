import { useLocation } from "react-router-dom";
import { useQuery , useMutation } from '@tanstack/react-query';
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

import { getUser } from "../api/user";

const userSchema = z.object({
    firstname: z.string().min(1, "Prénom requis"),
    lastname: z.string().min(1, "Nom requis"),
    email: z.string().email("Email invalide"),
    password: z.string().optional(), 
    address: z.string().min(1, "Adresse requise"), 
    zip: z.string().min(1, "Code postal requis"), 
    city: z.string().min(1, "Ville requise"),
    phone: z.string().min(10, "Numéro de téléphone invalide"),
    role: z.string().min(1)
});

export default function UpdateUser() {
    const location = useLocation();
    const userId = location.state?.userId; 
    
    const form = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email : "",
            password : "",
            firstname: "",
            lastname: "",
            role: "",
            address: "",
            city: "",
            zip: "",
            phone: ""
        },
    });
    const { handleSubmit, setValue, reset } = form;
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['getUser'], 
        queryFn: () => getUser(userId),
        enabled: !!userId,
    });
    
    console.log("Données recues:", data);

    useEffect(() => {
        if (data) {
            console.log("Données chargées dans le formulaire", data);
            reset(data.user); // Remplit tous les champs d'un coup
        }
    }, [data, reset]);

    

    const onSubmit = (formData) => {
        console.log("Données mises à jour :", formData);
        // Ici, tu peux appeler une API pour modifier l'utilisateur
    };

    if (isPending) return <div>Chargement...</div>;
    if (isError) return <div>Erreur : {error.message}</div>;

    return (
        <>
            <div>Modifier l'utilisateur avec ID : {userId}</div>
            <Card>
                <CardHeader>
                    <CardTitle>Modifier l'utilisateur</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prénom</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastname"
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
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
                            <Button type="submit">Mettre à jour</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
}