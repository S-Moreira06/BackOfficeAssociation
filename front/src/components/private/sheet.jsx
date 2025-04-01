import { Sheet, SheetContent, SheetHeader, SheetTrigger,SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from '@/components/ui/button'
import CreateReservation from "@/page/private/createReservation";

export default function ReusableSheet({ availabilityId}) {
        const [open, setOpen] = useState(false);
    
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="secondary">Réserver</Button>
            </SheetTrigger>
            <SheetContent side="right" >
                <CreateReservation availabilityId={availabilityId} closeSheet={() => setOpen(false)} className="w-[500px]" />
            </SheetContent> 
        </Sheet>
    );
}
