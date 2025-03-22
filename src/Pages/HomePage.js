import React from "react";
import HeroSection from "../components/HeroSection";
import PropertyList from "../components/PropertyList";
// import AboutSection from "../components/AboutSection";
// import ContactSection from "../components/ContactSection";

const HomePage = () => {
  return (
    <div className="my-5">
      <HeroSection />
      <PropertyList />
      {/* <AboutSection /> */}
      {/* <ContactSection /> */}
    </div>
  );
};

export default HomePage;
