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

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const userSchema = z.object({
    firstname: z.string().min(1, "Prénom requis"),
    lastname: z.string().min(1, "Nom requis"),
    email: z.string().email("Email invalide"), 
    address: z.string().min(1, "Adresse requise"), 
    zip: z.string().min(1, "Code postal requis"), 
    city: z.string().min(1, "Ville requise"),
    phone: z.string().min(10, "Numéro de téléphone invalide"),
    role: z.string().min(1)
});

export default function createUser() {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
        firstname: "Jean",
        lastname: "Neymar",
        email: "jean-neymar@hotmail.fr", 
        address: "Rue de la propagande", 
        zip: "01234", 
        city: "Saint Roustan",
        phone: "0698763578",
        role: "restaurateur"
    },
  });

  const { handleSubmit, setValue } = form;

  const userMutation = useMutation({
    mutationFn: async (newData) => {
      return await request(newData);
    },
    onSuccess: () => {
      window.location = "/users-list";
    },
  });

  const onSubmit = (data) => {
    userMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md bg-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Créer un utilisateur</CardTitle>
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
                        <FormField 
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={(value) => setValue("role", value)} defaultValue={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Administrateur</SelectItem>
                                    <SelectItem value="restaurant">Restauranteur</SelectItem>
                                    <SelectItem value="association">Gerant de l'association</SelectItem>
                                    <SelectItem value="agent">Agent de reservation</SelectItem>
                                </SelectContent>
                                </Select>
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
