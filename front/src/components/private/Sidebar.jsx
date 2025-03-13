import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function AppSidebar() {

    const menuItems = [
        { title: "Utilisateurs", links: [{ name: "Liste des Utilisateurs", path: "/user-list" }, { name: "Créer un utilisateur", path: "/create-user" }] },
        { title: "Restaurants", links: [{ name: "Liste des restaurants", path: "/restaurant-list" }, { name: "Créer un restaurant", path: "/create-restaurant" }] },
        { title: "Associations", links: [{ name: "Liste des associations", path: "/association-list" }, { name: "Créer une association", path: "/create-association" }] },
        { title: "Bénéficiaires", links: [{ name: "Liste des bénéficiaires", path: "/beneficiary-list" }, { name: "Créer un bénéficiaire", path: "/create-beneficiary" }] },
        { title: "Disponibilités", links: [{ name: "Liste des disponibilités", path: "/availability-list" }, { name: "Créer une disponibilité", path: "/create-availability" }] },
        { title: "Réservations", links: [{ name: "Liste des réservations", path: "/reservation-list" }, { name: "Créer une réservation", path: "/create-reservation" }] },
    ];
    const navigate = useNavigate()

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent className="gap-0">

              {menuItems.map((item) => (
                <SidebarGroup key={item.title}>
                    <SidebarGroupLabel  >{item.title}</SidebarGroupLabel>
                    <SidebarGroupContent> 
                        <SidebarMenu>
                            <SidebarMenuItem >
                                {item.links.map((link) => (
                                <SidebarMenuButton key={link.name}>
                                            <li >
                                                <div>
                                                    <p onClick={() => navigate(link.path)} className="">
                                                        {link.name}
                                                    </p>
                                                </div>
                                            </li>
                                </SidebarMenuButton>
                            ))}
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                ))}

            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
