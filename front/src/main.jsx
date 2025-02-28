import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useRouteError } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './index.css'
import Header from "./components/private/Header";
import Footer from "@/components/private/Footer"
import Register from "./page/auth/register";
import Login from "./page/auth/login";
import AdminLayout from "./layout/adminLayout";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})



const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient} >
      <Header />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
      <AdminLayout/>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);
