import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Nav />
      <main className="p-6 lg:p-10">
        <Outlet /> 
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
