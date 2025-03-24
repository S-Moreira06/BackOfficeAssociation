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
    SidebarRail
  } from "@/components/ui/sidebar"
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ChevronDown } from 'lucide-react';



export function AppSidebar() {

    const menuItems = [
        { logo:"ChevronDown",title: "Gestions ADMIN", links: [{ name: "Utilisateurs", path: "/user-list" },{ name: "Restaurants", path: "/restaurant-list" },{ name: "Associations", path: "/association-list" },{ name: "Demandes d'adhésion", path: "/request-list" }] },

        { logo:"ChevronDown",title: "Restaurants", links: [{name: "Mes disponibilités"},{name: "Mes réservations"}, {name: "Profil du restaurant"}] },
        { logo:"ChevronDown",title: "Associations", links: [{ name: "Liste des bénéficiaires", path: "/beneficiary-list" },{ name: "Liste des disponibilités", path: "/availability-list" }, {name: "Mes agents de réservation"}] },
    ];
    const navigate = useNavigate()

    return (
        <Sidebar collapsible="offcanvas">
            <SidebarHeader />
            <SidebarContent className="gap-0">
                <SidebarGroup key="acceuil">
                    <SidebarGroupLabel>
                        Acceuil
                    </SidebarGroupLabel>
                </SidebarGroup>
              {menuItems.map((item) => (
                <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup key={item.title}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield-user"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M6.376 18.91a6 6 0 0 1 11.249.003"/><circle cx="12" cy="11" r="4"/></svg> */}
                    <SidebarGroupLabel asChild >
                        <CollapsibleTrigger>
                        {item.title}
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
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
                    </CollapsibleContent>
                </SidebarGroup>
                </Collapsible>
                ))}

            </SidebarContent>
            <SidebarFooter>Ctrl+b to open/close</SidebarFooter>
             {/* <SidebarRail /> */}
        </Sidebar>
    )
}
