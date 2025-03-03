'use client'

import { request } from "@/api/request";
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

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const requestSchema = z.object({
  category: z.string().min(1, "Le type est requis"),
  name: z.string().min(1, "Nom requis"),
  address: z.string().min(1, "Adresse requise"), 
  zip: z.string().min(1, "Code postal requis"), 
  city: z.string().min(1, "Ville requise"),
  firstname: z.string().min(1, "Prénom requis"),
  lastname: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"), 
  phone: z.string().min(10, "Numéro de téléphone invalide"),
});

export default function Register() {
  const form = useForm({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      category: "",
      name: "asso1", 
      address: "726 Avenue de la rue", 
      zip: "01001", 
      city: "LA VILLE",
      firstname: "Pierre",
      lastname: "Grolar",
      email: "pierregrolar@gmail.fr",
      phone: "0606060666",
    },
  });

  const { handleSubmit, setValue } = form;

  const requestMutation = useMutation({
    mutationFn: async (newData) => {
      return await request(newData);
    },
    onSuccess: () => {
      window.location = "/";
    },
  });

  const onSubmit = (data) => {
    requestMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Demande d'inscription</CardTitle>
          <CardDescription>
            Suite à votre demande, vous serez contacté par un administrateur dans les plus brefs délais.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField 
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={(value) => setValue("category", value)} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type d'organisation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="association">Association</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'organisation</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nom de l'organisation" />
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
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom du contact</FormLabel>
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
                    <FormLabel>Nom du contact</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nom" type="text" />
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
                      <Input {...field} placeholder="Email" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                S'inscrire
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
