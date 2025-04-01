import { Sheet, SheetContent, SheetHeader, SheetTrigger,SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from '@/components/ui/button'
import CreateReservation from "@/page/private/createReservation";

export default function ReusableSheet({ 
    children,          // Accepte un contenu dynamique
    triggerText = "Réserver", // Le texte du bouton, avec une valeur par défaut
    side = "right",     // Le côté où afficher le Sheet, avec une valeur par défaut
    ...rest            // Autres props que vous souhaitez transmettre au Sheet
}) {
        const [open, setOpen] = useState(false);
    
    return (
        <Sheet open={open} onOpenChange={setOpen} {...rest}>
            <SheetTrigger asChild>
                <Button variant="secondary">{triggerText}</Button>
            </SheetTrigger>
            <SheetContent side="right" >
                {children}
            </SheetContent> 
        </Sheet>
    );
}
