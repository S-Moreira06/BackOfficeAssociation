import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/private/Sidebar"

import Footer from "@/components/private/Footer";
import Header from "@/components/private/Header";
import Guest from "@/page/guest";

export default function AdminLayout({ children }) {
    const storedData = localStorage.getItem("accessToken")

    return(
        <>
            {storedData ? (
            <>
                <Header />
                <SidebarProvider>
                <AppSidebar />
                <main>
                    {/* <SidebarTrigger /> */}
                    <Outlet/>
                </main>
                </SidebarProvider>
                <Footer/>
            </>
            ):(
            <>
                <Header/>
                <Guest/>
            </>
            )}
        </>
    )
}