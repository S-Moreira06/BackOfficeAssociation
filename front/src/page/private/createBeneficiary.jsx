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

import { createBeneficiary } from "@/api/beneficiary"

const beneficiarySchema = z.object({
    firstname: z.string().min(1, "Prénom requis"),
    lastname: z.string().min(1, "Nom requis"),
    address: z.string().min(1, "Adresse requise"), 
    zip: z.string().min(1, "Code postal requis"), 
    city: z.string().min(1, "Ville requise"),
    phone: z.string().min(10, "Numéro de téléphone invalide")
});

export default function CreateBeneficiary() {
    const form = useForm({
        resolver: zodResolver(beneficiarySchema),
            defaultValues: {
                firstname: "Hall",
                lastname: "Laru",
                address: "3 place de la misericorde",
                city: "Paris",
                zip: "75000",
                phone: "0608090765"
        },
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { handleSubmit, setValue } = form;

    const beneficiaryMutation = useMutation({
        mutationFn: async (newData) => {
            return await createBeneficiary(newData);
        },
        onSuccess: () => {
            console.log("beneficiary is create !");
            queryClient.invalidateQueries(['beneficiaryList']);
            setTimeout(() => {
                navigate("/beneficiary-list");
            }, 500); 
        },
        onError: (error) => {
            console.log("Erreur lors de la création :", error)
        }
    });

    const onSubmit = (data) => {
        beneficiaryMutation.mutate(data);
    };

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md bg-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Créer un beneficiaire</CardTitle>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Prénom" type="text" />
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
                                <Input {...field} placeholder="Nom" type="text" />
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
                            <Input {...field} placeholder="Adresse" type="text" />
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
                                <FormLabel>Code Postal</FormLabel>
                                <FormControl>
                                <Input {...field} placeholder="Code Postal" type="text" />
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
                                <Input {...field} placeholder="Ville" type="text" />
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
                                <Input {...field} placeholder="Téléphone" type="tel" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                    </CardContent>

                    <CardFooter>
                    <Button type="submit" className="w-full">
                        Créer le bénéficiaire
                    </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    </div>
    );
}
