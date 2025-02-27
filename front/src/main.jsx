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
import UserList from "./layout/userList";
import CreateUser from "./page/createUser";
import UpdateUser from "./page/updateUser";
import BeneficiaryList from "./layout/beneficiaryList";
import UpdateBeneficiary from "./page/updateBeneficiary";
import CreateBeneficiary from "./page/createBeneficiary";
import RestaurantList from "./layout/restaurantList";
import UpdateRestaurant from "./page/updateRestaurant";
import CreateRestaurant from "./page/createRestaurant";
import AssociationList from "./layout/associationList";
import UpdateAssociation from "./page/updateAssociation";
import CreateAssociation from "./page/createAssociation";




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
        <Route path="/user-list" element={<UserList />} />
        <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/update-user" element={<UpdateUser/>} />
        <Route path="/beneficiary-list" element={<BeneficiaryList/>} />
        <Route path="/update-beneficiary" element={<UpdateBeneficiary/>} />
        <Route path="/create-beneficiary" element={<CreateBeneficiary/>}/>
        <Route path="/restaurant-list" element={<RestaurantList/>} />
        <Route path="/update-restaurant" element={<UpdateRestaurant/>} />
        <Route path="/create-restaurant" element={<CreateRestaurant/>}/>
        <Route path="/association-list" element={<AssociationList/>}/>
        <Route path="/update-association" element={<UpdateAssociation/>} />
        <Route path="/create-association" element={<CreateAssociation/>}/>

      </Routes>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);
