import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/private/Footer";
import Header from "@/components/private/Header";
import Guest from "@/page/guest";

export default function AdminLayout() {
    const storedData = localStorage.getItem("accessToken")

    return(
        <>
            {storedData ? (
            <>
                <Header />
                <Outlet/>
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