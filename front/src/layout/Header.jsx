import {NavigationMenu,NavigationMenuContent,NavigationMenuIndicator,NavigationMenuItem,NavigationMenuLink,NavigationMenuList,NavigationMenuTrigger,NavigationMenuViewport} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo.png"
import { LogOut } from "lucide-react"


export default function Header() {
    const token = localStorage.getItem('accessToken')
    console.log(localStorage)
    function logout(){
        localStorage.clear()
        window.location="/"
    }
    function toLogin(){
        window.location="/auth/login"
    }
    function toRegister(){
        window.location="/auth/register"
    }
    return (
        <div className="sticky top-0 bg-white flex justify-between border-b px-10 pb-2">
            <img src={logo} alt="" className="w-[5%] "/>
            {token &&(<NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Utilisateurs</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-2 w-[250px]">
                            <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Liste des Utilisateurs</a>
                                    </NavigationMenuLink>
                                </li>
                                <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Créer un utilisateur</a>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Restaurants</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-2 w-[250px]">
                            <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Liste des restaurants</a>
                                    </NavigationMenuLink>
                                </li>
                                <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Créer un restaurant</a>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Associations</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-2 w-[250px]">
                            <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Liste des associations</a>
                                    </NavigationMenuLink>
                                </li>
                                <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Créer une association</a>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Bénéficiaires</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-2 w-[250px]">
                            <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Liste des bénéficiaires</a>
                                    </NavigationMenuLink>
                                </li>
                                <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Créer un bénéficiaire</a>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Disponibilités</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-2 w-[250px]">
                            <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Liste des disponibilités</a>
                                    </NavigationMenuLink>
                                </li>
                                <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Créer une disponibilité</a>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem >
                        <NavigationMenuTrigger>Reservations</NavigationMenuTrigger>
                        <NavigationMenuContent className="relative">
                            <ul className="absolute top-0 left-0 grid gap-3 p-2 w-[250px]">
                            <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Liste des réservations</a>
                                    </NavigationMenuLink>
                                </li>
                                <li>
                                    <NavigationMenuLink asChild>
                                        <a href="">Créer une réservation</a>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>)}
            {
        token != null ?   
        <Button className="self-center bg-white text-black hover:bg-gray-200 px-2 py-2 flex" onClick={()=>{
            logout()
        }}>
            <LogOut />
        Deconnexion
        </Button>:
        <div className='flex gap-0 items-center'>
            <Button onClick={()=>{toLogin()}}>
                Connexion
            </Button>
            <Button onClick={()=>{toRegister()}}>
                Inscription
            </Button>
        </div>

        }
        </div>
    )
}