import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './index.css';
import Register from "./page/auth/register";
import Login from "./page/auth/login";
import AdminLayout from "./layout/adminLayout";
import Home from "./page/private/home";
import UserList from "./page/private/userList";
import CreateUser from "./page/private/createUser";
import UpdateUser from "./page/private/updateUser";
import BeneficiaryList from "./page/private/beneficiaryList";
import UpdateBeneficiary from "./page/private/updateBeneficiary";
import CreateBeneficiary from "./page/private/createBeneficiary";
import RestaurantList from "./page/private/restaurantList";
import UpdateRestaurant from "./page/private/updateRestaurant";
import CreateRestaurant from "./page/private/createRestaurant";
import AssociationList from "./page/private/associationList";
import UpdateAssociation from "./page/private/updateAssociation";
import CreateAssociation from "./page/private/createAssociation";
import RequestList from "./page/private/requestList";
import RequestDetail from "./page/private/requestDetail";
import CreateAvailability from "./page/private/createAvailability"
import AvailabilityList from "./page/private/availabilityList";
import AvailabilityDetail from "./page/private/availabilityDetail";
import CreateReservation from "./page/private/createReservation";
import ReservationList from "./page/private/reservationList";



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
      
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register/:cat" element={<Register />} />
        
        <Route path="" element={<AdminLayout/>}>
          <Route path="/" element={<Home />} />
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
          <Route path="/request-list" element={<RequestList/>} />
          <Route path="/request-detail" element={<RequestDetail/>} />
          <Route path="/create-availability" element={<CreateAvailability/>}/>
          <Route path="/availability-list" element={<AvailabilityList/>} />
          <Route path="/availability-detail" element={<AvailabilityDetail/>} />
          <Route path="/create-reservation" element={<CreateReservation/>}/>
          <Route path="/reservation-list" element={<ReservationList/>} />
        </Route>
      </Routes>      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);
