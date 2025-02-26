import { useLocation,useNavigate } from "react-router-dom";
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

import { getAssociation, updateAssociation } from "@/api/association";

const associationSchema = z.object({
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

export default function UpdateAssociation () {
    const location = useLocation();
    const associationId = location.state?.associationId; 
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(associationSchema),
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
        queryKey: ['getAssociation' , associationId], 
        queryFn: () => getAssociation(associationId),
        enabled: !!associationId,
    });
    console.log("Données recues:", data);
    useEffect(() => {
        if (data?.organisation) {
            console.log("Données chargées dans le formulaire", data.organisation);
            reset(data.organisation);
        }
    }, [data?.organisation, reset]);

    const updateAssociationMutation = useMutation({
        mutationFn: async (newData) => {
            return await updateAssociation(associationId, newData)
        },
        onSuccess: () => {
            
            window.location = "/association-list";
        },
    });

    const onSubmit = (formData) => {
        console.log("Données mises à jour :", formData);
        updateAssociationMutation.mutate(formData);
    };

    if (isPending) return <div>Chargement...</div>;
    if (isError) return <div>Erreur : {error.message}</div>;

    return (
        <>
                    <div>Modifier le association avec ID : {associationId}</div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Modifier le association</CardTitle>
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