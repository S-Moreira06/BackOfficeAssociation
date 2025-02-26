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
import BeneficiaryList from "./layout/beneficiaryList";
import UpdateBeneficiary from "./page/updateBeneficiary";
import CreateBeneficiary from "./page/createBeneficiary";
import RestaurantsList from "./layout/RestaurantsList";
import UpdateRestaurant from "./page/updateRestaurant";
import AssociationList from "./layout/AssociationList";
import UpdateAssociation from "./page/updateAssociation";




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
        <Route path="/beneficiary-list" element={<BeneficiaryList/>} />
        <Route path="/update-beneficiary" element={<UpdateBeneficiary/>} />
        <Route path="/create-beneficiary" element={<CreateBeneficiary/>}/>
        <Route path="/restaurants-list" element={<RestaurantsList/>} />
        <Route path="/update-restaurant" element={<UpdateRestaurant/>} />
        <Route path="/association-list" element={<AssociationList/>}/>
        <Route path="/update-association" element={<UpdateAssociation/>} />

      </Routes>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);
