import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { getAvailabilityById } from "@/api/availability"

const availabilitySchema = z.object({
    id_organisation: z.string(),
    id_availability: z.string(),
    time: z.string(),
    email: z.string(),
    nb_place_setting: z.string(),
    status: z.string(),
    take_away: z.string()
})

export default function CreateReservation () {
    const location = useLocation();
    const availabilityId = location.state?.availabilityId;
    console.log(availabilityId)
    const { isPending, isError, data, error } = useQuery({ 
        queryKey: ['availabilityDetail', availabilityId], 
        queryFn: () =>getAvailabilityById(availabilityId)
    })
    console.log(data)
    const form = useForm({
        resolver: zodResolver(availabilitySchema),
            defaultValues: {
                id_organisation: "",
                id_availability: availabilityId,
                time: "",
                email: "",
                nb_place_setting: "",
                status: "",
                take_away: ""
            },
        });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { handleSubmit, setValue } = form;

    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <>
        <Card>
            <CardHeader>

            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                    <FormField
                        control={form.control}
                        name="id_organisation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Association</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="id_availability"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Disponibilité</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Heure</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    /><FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    /><FormField
                    control={form.control}
                    name="nb_place_setting"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Association</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    /><FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Statut</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="take_away"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>A emporté</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Créer une reservation</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        </>
    )
}