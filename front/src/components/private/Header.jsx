import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate()

    function logout() {
        localStorage.clear();
        window.location = "/";
    }

    const menuItems = [
        { title: "Utilisateurs", links: [{ name: "Liste des Utilisateurs", path: "/user-list" }, { name: "Créer un utilisateur", path: "/create-user" }] },
        { title: "Restaurants", links: [{ name: "Liste des restaurants", path: "/restaurant-list" }, { name: "Créer un restaurant", path: "/create-restaurant" }] },
        { title: "Associations", links: [{ name: "Liste des associations", path: "/association-list" }, { name: "Créer une association", path: "/create-association" }] },
        { title: "Bénéficiaires", links: [{ name: "Liste des bénéficiaires", path: "/beneficiary-list" }, { name: "Créer un bénéficiaire", path: "/create-beneficiary" }] },
        { title: "Disponibilités", links: [{ name: "Liste des disponibilités", path: "/availability-list" }, { name: "Créer une disponibilité", path: "/create-availability" }] },
        { title: "Réservations", links: [{ name: "Liste des réservations", path: "/reservation-list" }, { name: "Créer une réservation", path: "/create-reservation" }] },
    ];

    return (
        <div className="sticky top-0 bg-white z-40 flex justify-between items-center border-b px-8 py-2">
            <img src={logo} alt="La petite Lili" className="w-[5%] min-w-[50px]" onClick={() => navigate("/")}/>
            {token && !isMobile && (
                <NavigationMenu>
                    <NavigationMenuList>
                        {menuItems.map((item, index) => (
                            <NavigationMenuItem key={item.title}>
                                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-white">
                                    <ul className="grid gap-2 p-2 w-[250px]">
                                        {item.links.map((link) => (
                                            <li key={link.name}>
                                                <NavigationMenuLink asChild>
                                                    <Button onClick={() => navigate(link.path)} className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded">
                                                        {link.name}
                                                    </Button>
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

            <div className="flex justify-between items-center">
                
                {token != null ? (
                    <Button
                        className="self-center bg-white text-black hover:bg-gray-200 px-2 py-2 flex"
                        onClick={logout}
                    >
                        <LogOut /> Déconnexion
                    </Button>
                ) : (
                    <div className="flex items-center ">
                        <Button className="px-2 py-2" onClick={() => navigate("/auth/login")}>Connexion</Button>
                        <Button className="px-2 py-2" onClick={() => navigate("/auth/register")}>Inscription</Button>
                    </div>
                )}
                {token && isMobile && (
                    <DropdownMenu className="">
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-[10%]">
                                <Menu />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[250px] bg-gray-400 ">
                            {menuItems.map((item) => (
                                <DropdownMenuItem key={item.title} className="flex flex-col">
                                    <span className="font-bold">{item.title}</span>
                                    {item.links.map((link) => (
                                        <Button key={link.name} onClick={() => navigate(link.path)} className="text-sm pl-2 hover:underline">
                                            {link.name}
                                        </Button>
                                    ))}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
}
