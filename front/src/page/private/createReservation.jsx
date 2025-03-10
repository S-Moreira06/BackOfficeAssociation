import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { getAvailabilityById } from "@/api/availability"
import { getAllAssociation } from "@/api/association"
import { createReservation } from "@/api/reservation";

const reservationSchema = z.object({
    id_organisation: z.coerce.number().int(),
    id_availability: z.number().int(),
    time: z.string(),
    email: z.string(),
    nb_place_setting: z.coerce.string(),
    status: z.string(),
    take_away: z.coerce.string(),
    commentary: z.string().max(255).optional()
})

const devBene = [
    { name: "Jean Bon", mail: "jeanbon@devBene.fr" },
    { name: "Alice Code", mail: "alicecode@devBene.fr" },
    { name: "Bob Dev", mail: "bobdev@devBene.fr" },
    { name: "Charlie Script", mail: "charlie@devBene.fr" },
    { name: "Diane Algo", mail: "diane@devBene.fr" },
    { name: "Evan Stack", mail: "evan@devBene.fr" },
    { name: "Fanny Debug", mail: "fanny@devBene.fr" },
    { name: "Georges Syntax", mail: "georges@devBene.fr" },
    { name: "Hugo Compile", mail: "hugo@devBene.fr" },
    { name: "Isabelle Function", mail: "isabelle@devBene.fr" }
];


export default function CreateReservation () {
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
    const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);

    const location = useLocation();
    const availabilityId = location.state?.availabilityId;

    const { isPending: isAvailabilityLoading, isError: isAvailabilityError, data: availabilityData, error: availabilityError } = useQuery({
        queryKey: ['availabilityDetail', availabilityId],
        queryFn: () => getAvailabilityById(availabilityId),
        enabled: !!availabilityId ,
        
    });
    const { isPending: isAssociationsLoading, isError: isAssociationsError, data: associationsData, error: associationsError } = useQuery({
        queryKey: ['associationList'], 
        queryFn: getAllAssociation
    });

    function getHours(time) {
        return Number(time.split(':')[0]);    // separe chaque element d'un string séparé par la valeur entre parentheses et les placent dans un array
    }
    function getMinutes(time) {
        return Number(time.split(":")[1]);
    }

    const timeSlot = [];
    if (availabilityData?.availability) {
        let startHour = getHours(availabilityData.availability.time_start);
        let startMinute = getMinutes(availabilityData.availability.time_start);
        const endHour = getHours(availabilityData.availability.time_end);
        const endMinute = getMinutes(availabilityData.availability.time_end);

        while (startHour < endHour || (startHour === endHour && startMinute <= endMinute)) { // on compare dabord les heures et si elles sont egales on passe aux minutes
            timeSlot.push(`${String(startHour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}`); // on ajoute la valeur a notre array en s'assurant que ce soit par exemple 01H00 et pas 1h00
            startMinute += 30; // ici c'est la durée de nos plages de reservation , a changer si necessaire
            if (startMinute === 60) {// condition pour passer a l'heure suivante si les minutes sont a 60
                startMinute = 0;
                startHour++;
            }
        }
    }
    const sitSlot = []
    for (let sit = 0; sit < availabilityData.availability.max_people; sit++) {
        sitSlot.push(sit +1);
    }
    
    const form = useForm({
        resolver: zodResolver(reservationSchema),
            defaultValues: {
                id_availability: availabilityId,
                status: "en attente",
                take_away: 0
            },
        });
    
    const navigate = useNavigate();

    const reservationMutation = useMutation({
        mutationFn: async (newData) => {
            return await createReservation(newData);
        },
        onSuccess: () => {
            console.log("reservation is create !");
            // queryClient.invalidateQueries(['associationList']); a remplacer par reservationList quand ce sera créer
            setTimeout(() => {
                navigate("/availability-detail",{ state: { availabilityId: availabilityId }});
            }, 500); 
        },
        
        onError: (error) => {
            console.log("Erreur lors de la création :", error)
        }
    });

    const onSubmit = (data) => {
        data.time = availabilityData.availability.date + " " + data.time;
        console.log("données envoyés:" , data)
        reservationMutation.mutate(data)
    };
    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[80%] my-5 max-w-xl bg-white shadow-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Créer une réservation</CardTitle>

            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
                    <FormField
                        control={form.control}
                        name="take_away"
                        render={({ field }) => (
                            <FormItem className=" items-center justify-between">
                            <FormControl className="justify-center">
                                <div className="flex items-center  space-x-2 text-gray-700">
                                <span className={field.value ? 'text-base' : 'text-xl'}>Sur place</span>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                <span className={field.value ? 'text-xl' : 'text-base'}>À emporter</span>
                                </div>
                            </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="id_organisation"
                        render={({ field }) => {
                            const selectedAssociation = associationsData?.organisations.find((r) => r.id === Number(field.value));
                            return (
                                <FormItem>
                                <FormLabel>Organisation</FormLabel>
                                <Select 
                                    onValueChange={(value) => {
                                    field.onChange(value);
                                    }} 
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue  />
                                        {selectedAssociation?.name || "Choisissez une association"}
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {associationsData?.organisations?.map((association) => (
                                            <SelectItem key={association.id} value={association.id}>{association.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>

                            )
                        }}
                    />
                    <div className="flex justify-around">
                        <FormField
                            control={form.control}
                            name="nb_place_setting"
                            render={({ field }) => {
                                const selectedSit = associationsData?.organisations.find((r) => r.id === Number(field.value));
                                return (
                                <FormItem>
                                    <FormLabel>Nombre de couverts</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Nombre de couverts" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            {sitSlot.map((sit) => (
                                                <SelectItem key={sit} value={sit.toString()}>
                                                    {sit}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}}
                        />
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Heure</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sélectionnez une heure" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            {timeSlot.map((time) => (
                                                <SelectItem key={time} value={time}>
                                                    {time}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="beneficiary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Beneficiaires</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        const selected = devBene.find((bene) => bene.name === value);
                                        if (selected && !selectedBeneficiaries.some(bene => bene.name === selected.name)) {
                                            setSelectedBeneficiaries([...selectedBeneficiaries, selected]); // ajouter sans doublons
                                        }
                                    }}
                                >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sélectionnez un bénéficiaire" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {devBene
                                        .filter((bene) => !selectedBeneficiaries.some((selected) => selected.name === bene.name)) // filtre les bénéficiaires déjà sélectionnés
                                        .map((bene) => (
                                            <SelectItem key={bene.name} value={bene.name}>
                                                {bene.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    {/* affichage des beneficiaires selectionés */}
                    {selectedBeneficiaries.length > 0 && (
                        <div className="mt-2 p-2 border rounded-lg bg-gray-50">
                            {selectedBeneficiaries.map((bene, index) => (
                                <div key={index} className="flex justify-between items-center p-1 border-b">
                                    <p><strong>Nom :</strong> {bene.name}</p>
                                    <p><strong>Email :</strong> {bene.mail}</p>
                                    <Button
                                        variant="outline"
                                        className="ml-2 text-red-500"
                                        onClick={() => {
                                            setSelectedBeneficiaries(
                                                selectedBeneficiaries.filter((b) => b.name !== bene.name)
                                            );
                                        }}
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                    <FormField
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
                    />
                    <FormField
                        control={form.control}
                        name="commentary"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Commentaire</FormLabel>
                            <FormControl>
                                <Textarea {...field}  />
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
        </div>
        </>
    )
}