import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import PropertiesPage from "./Pages/PropertiesPage";
import ContactPage from "./Pages/ContactPage";
import "./assets/css/style.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/bootstrap.min.css"
import TestimonialSection from "./Pages/TestimonialSection";
import PropertyTypes from "./Pages/PropertyType";
import PropertyAgent from "./Pages/PropertyAgent";
import LoginPage from "./Pages/LoginPAge";
import RegisterPage from "./Pages/RegistrationPage";
import AddProperty from "./Pages/Form";
// import Chatbot from "react-chatbot-kit";
import ChatbotComponenet from "./Pages/Chatbot";
import AdminUserManagement from "./Pages/AdminManagePage";
import PGPropertiesPage from "./Pages/PGPage";
// import AddGarage from "./Pages/GaragePage";
import GarageListings from "./Pages/GaragePage";
import HomeProperty from "./Pages/HomeProperty";
import AdditionalProperty from "./Pages/SubForm";
import PropertyListingsPage from "./Pages/Demo";
import OfficePropertiesPage from "./Pages/Demo";
import ApartmentListingsPage from "./Pages/AppartmentPage";
import ShopListingsPage from "./Pages/ShopPage";
import OfficeDescriptionPage from "./Pages/OfficeDescription";
import HomeDescriptionPage from "./Pages/Homedescriotion";
import PGDescriptionPage from "./Pages/PGDescription";
import GarageDescriptionPage from "./Pages/GarageDescription";
import ShopDescriptionPage from "./Pages/Shopdescriptionpage";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/properties" element={<PropertiesPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/testimonial" element={<TestimonialSection/>}/>
        <Route path='/properties-type' element={<PropertyTypes/>}/>
        <Route path='/properties-Agent' element={<PropertyAgent/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/Register' element={<RegisterPage/>}/>
        <Route path='/form' element={<AddProperty/>}/>
        <Route path='/ChatbotPage' element={<ChatbotComponenet/>}/>
        <Route path='/Property/PG' element={<PGPropertiesPage/>}/>
        <Route path='/Admin' element={<AdminUserManagement/>}/>
        <Route path='/Property/Garage' element={<GarageListings/>}/>
        <Route path='/Property/Home' element={<HomeProperty/>}/>
        <Route path='/subform' element={<AdditionalProperty/>}/>
        <Route path='/Property/Office'element={<OfficePropertiesPage/>}/>
        <Route path='/Property/Apartment' element={<ApartmentListingsPage/>}/>
        <Route path='/Property/Shop' element={<ShopListingsPage/>}/>
        <Route path="/description/:id" element={<OfficeDescriptionPage/>}/>
        <Route path="/home/description/:id" element={<HomeDescriptionPage/>}/>
        <Route path="/PG/description/:id" element={<PGDescriptionPage/>}/>
        <Route path="/Garage/description/:id" element={<GarageDescriptionPage/>}/>
        <Route path="/Shop/description/:id" element={<ShopDescriptionPage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
