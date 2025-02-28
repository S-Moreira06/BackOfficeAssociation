import { useLocation,useNavigate } from "react-router-dom";
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

import { getBeneficiary, updateBeneficiary } from "../../api/beneficiary";

const beneficiarySchema = z.object({
    firstname: z.string().min(1, "Prénom requis"),
    lastname: z.string().min(1, "Nom requis"),
    address: z.string().min(1, "Adresse requise"), 
    zip: z.string().min(1, "Code postal requis"), 
    city: z.string().min(1, "Ville requise"),
    phone: z.string().min(10, "Numéro de téléphone invalide")
});

export default function UpdateBeneficiary() {
    const location = useLocation();
    const beneficiaryId = location.state?.beneficiaryId; 
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    
    const form = useForm({
        resolver: zodResolver(beneficiarySchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            address: "",
            city: "",
            zip: "",
            phone: ""
        },
    });
    const { handleSubmit, setValue, reset } = form;
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['getBeneficiary' , beneficiaryId], 
        queryFn: () => getBeneficiary(beneficiaryId),
        enabled: !!beneficiaryId,
    });
    
    console.log("Données recues:", data);

    useEffect(() => {
        if (data?.beneficiary) {
            console.log("Données chargées dans le formulaire", data.beneficiary);
            reset(data.beneficiary);
        }
    }, [data?.beneficiary, reset]);

    const updateBeneficiaryMutation = useMutation({
        mutationFn: async (newData) => {
            return await updateBeneficiary(beneficiaryId, newData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['beneficiaryList']);
            setTimeout(() => {
                navigate("/beneficiary-list");
            }, 500); 
        },
        onError: (error) => {
            console.log("update failed :", error)
        }
    });

    const onSubmit = (formData) => {
        console.log("Données mises à jour :", formData);
        updateBeneficiaryMutation.mutate(formData);
    };

    if (isPending) return <div>Chargement...</div>;
    if (isError) return <div>Erreur : {error.message}</div>;

    return (
        <>
            <div>Modifier le bénéficiaire avec ID : {beneficiaryId}</div>
            <Card>
                <CardHeader>
                    <CardTitle>Modifier le bénéficiaire</CardTitle>
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