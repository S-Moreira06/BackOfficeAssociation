import logo from "@/assets/logo-white.png"

export default function Footer() {
    
    return (
        <div className="bg-gray-800 px-5 py-1 flex justify-between">
            <img src={logo} alt="" className="w-[8%] min-w-14 max-w-20"/>
            <div className="text-xs sm:text-base md:text-lg self-center ">
                <ul>
                    <li>Conditions générales d'utilisation</li>
                    <li>Mentions légales</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div>
    )
}