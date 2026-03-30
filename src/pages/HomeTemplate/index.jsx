import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
export default function HomeTemplate() {
  return (
    <div>
      <Header />
      <div className="pt-20 min-h-screen bg-zinc-900"> 
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
