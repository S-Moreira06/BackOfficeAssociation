import { useState, useEffect } from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";
import { LogOut, Menu } from "lucide-react";

export default function Header() {
    const token = localStorage.getItem("accessToken");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 999);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 999);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function logout() {
        localStorage.clear();
        window.location = "/";
    }
    function toLogin() {
        window.location = "/auth/login";
    }
    function toRegister() {
        window.location = "/auth/register";
    }

    const menuItems = [
        { title: "Utilisateurs", links: ["Liste des Utilisateurs", "Créer un utilisateur"] },
        { title: "Restaurants", links: ["Liste des restaurants", "Créer un restaurant"] },
        { title: "Associations", links: ["Liste des associations", "Créer une association"] },
        { title: "Bénéficiaires", links: ["Liste des bénéficiaires", "Créer un bénéficiaire"] },
        { title: "Disponibilités", links: ["Liste des disponibilités", "Créer une disponibilité"] },
        { title: "Réservations", links: ["Liste des réservations", "Créer une réservation"] },
    ];

    return (
        <div className="sticky top-0 bg-white flex justify-between items-center border-b px-10 py-2">
            <img src={logo} alt="" className="w-[5%] min-w-[50px]" />
            {token && !isMobile && (
                <NavigationMenu>
                    <NavigationMenuList>
                        {menuItems.map((item, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-2 w-[250px]">
                                        {item.links.map((link, i) => (
                                            <li key={i}>
                                                <NavigationMenuLink asChild>
                                                    <a href="">{link}</a>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            )}

            <div className="flex items-center gap-2">
                {token && isMobile && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Menu />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[250px]">
                            {menuItems.map((item, index) => (
                                <DropdownMenuItem key={index} className="flex flex-col">
                                    <span className="font-bold">{item.title}</span>
                                    {item.links.map((link, i) => (
                                        <a key={i} href="" className="text-sm pl-2">{link}</a>
                                    ))}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {token != null ? (
                    <Button
                        className="self-center bg-white text-black hover:bg-gray-200 px-2 py-2 flex"
                        onClick={logout}
                    >
                        <LogOut /> Déconnexion
                    </Button>
                ) : (
                    <div className="flex gap-2 items-center">
                        <Button onClick={toLogin}>Connexion</Button>
                        <Button onClick={toRegister}>Inscription</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
