'use client'

import { request } from "@/api/request"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const requestSchema = z.object({
  name: z.string(),
  contact: z.string(),
  email: z.string().email("Email invalide"), 
  phone: z.string(), 
  address: z.string(), 
  zip: z.string(), 
  city: z.string(), 
  siret: z.string(), 
  type: z.string(),
  max_meal: z.string(),
  description: z.string(),
  image: z.string(),
  menu: z.string()
}
)


export default function Register() {

  const { register, handleSubmit } = useForm({
      resolver: zodResolver(requestSchema),
      defaultValues: {
        name: "asso1", 
        contact: "Pierre Grolar", 
        email: "pierregrolar@gmail.fr",
        phone: "0606060666", 
        address:"726 Avenue de la rue", 
        zip: "01001", 
        city: "LA VILLE", 
        siret: "71617851785385", 
        type: "Asso",
        max_meal: "12",
        description: "Voici une description pour tester",
        image: "image.png",
        menu: "menu.png"
      }
    })

    const requestMutation = useMutation({
      mutationFn: async (newTodo) => {
        return await request(newTodo)
      },
      onSuccess: (data) => {
        console.log("data", data)
        window.location = "/"
      },
  
    })

    const onSubmit = (data) => {
      requestMutation.mutate(data)
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Demande d'inscription</CardTitle>
          <CardDescription>Suite a votre demande, vous serrez contacté par un administrateur dans les plus brefs delais</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nom de l'organisation
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Contact
              </label>
              <Input
                id="contact"
                type="text"
                placeholder="Entrez le nom du contact"
                {...register("contact")}
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
              <label htmlFor="siret" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Siret
              </label>
              <Input
                id="siret"
                type="siret"
                placeholder="Enter your siret"
                {...register("siret")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Type
              </label>
              <Input
                id="type"
                type="type"
                placeholder="Enter your type"
                {...register("type")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="max_meal" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nombre de repas max
              </label>
              <Input
                id="max_meal"
                type="max_meal"
                placeholder="Enter your max_meal"
                {...register("max_meal")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nombre de repas max
              </label>
              <Input
                id="description"
                type="description"
                placeholder="Enter your description"
                {...register("description")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nombre de repas max
              </label>
              <Input
                id="image"
                type="image"
                placeholder="Enter your image"
                {...register("image")}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="menu" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nombre de repas max
              </label>
              <Input
                id="menu"
                type="menu"
                placeholder="Enter your menu"
                {...register("menu")}
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
      </Card>
    </div>
  )
}

