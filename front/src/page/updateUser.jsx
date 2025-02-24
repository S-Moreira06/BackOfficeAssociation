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
    password: z.string(), 
    address: z.string().min(1, "Adresse requise"), 
    zip: z.string().min(1, "Code postal requis"), 
    city: z.string().min(1, "Ville requise"),
    phone: z.string().min(10, "Numéro de téléphone invalide"),
    role: z.string().min(1)
});

export default function UpdateUser() {
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
    const { handleSubmit, setValue } = form;
    const location = useLocation();
    const userId = location.state?.userId; 
    const { isPending, isError, data, error } = useQuery({ queryKey: ['getUser'], queryFn: getUser(userId) })
    

    return (
        <>
            <div>Modifier l'utilisateur avec ID : {userId}</div>
            <Card>
                <CardHeader>
                    <CardTitle>Modifier l'utilisateur</CardTitle>
                    <CardDescription>ID de l'utilisateur:{userId}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </>

    );
}
