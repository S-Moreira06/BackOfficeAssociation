import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useRouteError } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './index.css'
import Header from "./layout/Header";
import Footer from "@/layout/Footer"
import Register from "./page/auth/register";
import Login from "./page/auth/login";
import Home from "./page/home";
import UsersList from "./layout/UsersList";
import CreateUser from "./page/createUser";
import UpdateUser from "./page/updateUser";



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
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/users-list" element={<UsersList />} />
        <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/update-user" element={<UpdateUser/>} />
      </Routes>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);
