'use client'

import { request } from "@/api/request";

import { useState } from 'react';
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
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";

const requestSchema = z.object({
  type: z.string(),
  name: z.string(),
  address: z.string(), 
  zip: z.string(), 
  city: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email("Email invalide"), 
  phone: z.string()
}
);


export default function Register() {

  const { register, handleSubmit, setValue } = useForm({
      resolver: zodResolver(requestSchema),
      defaultValues: {
        type: "association",
        name: "asso1", 
        address:"726 Avenue de la rue", 
        zip: "01001", 
        city: "LA VILLE",
        firstname: "Pierre",
        lastname: "Grolar",
        email: "pierregrolar@gmail.fr",
        phone: "0606060666"
        
      }
    });
    

    const requestMutation = useMutation({
      mutationFn: async (newTodo) => {
        return await request(newTodo)
      },
      onSuccess: (data) => {
        console.log("data", data)
        window.location = "/"
      },
    });

    const onSubmit = (data) => {
      requestMutation.mutate(data)
    }

    const handleSelectChange = (value) => {
      setValue("type", value);
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Demande d'inscription</CardTitle>
          <CardDescription>Suite a votre demande, vous serrez contacté par un administrateur dans les plus brefs delais</CardDescription>
        </CardHeader>

        <Form {...register}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Type
            </label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type d'organisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="association">Association</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" {...register("type", { required: true })} />
          </div>
          <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nom de l'organisation
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter organisation's name"
                {...register("name")}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Adresse
              </label>
              <Input
                id="address"
                type="address"
                placeholder="Enter your address"
                {...register("address")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="zip" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Code Postal
              </label>
              <Input
                id="zip"
                type="zip"
                placeholder="Enter your zip"
                {...register("zip")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Ville
              </label>
              <Input
                id="city"
                type="city"
                placeholder="Enter your city"
                {...register("city")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="firstname" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Prénom du contact
              </label>
              <Input
                id="firstname"
                type="text"
                placeholder="Enter your firstname"
                {...register("firstname")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastname" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nom du contact
              </label>
              <Input
                id="lastname"
                type="text"
                placeholder="Enter your lastname"
                {...register("lastname")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Téléphone
              </label>
              <Input
                id="phone"
                type="phone"
                placeholder="Enter your phone"
                {...register("phone")}
                required
              />
            </div>
            
            
            
                        
            {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </CardFooter>
          
        </form>
        </Form>
      </Card>
      
    </div>
  )
}

