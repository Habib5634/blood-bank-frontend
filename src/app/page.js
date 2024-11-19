'use client'
import Donors from "@/components/Donors";
import HeroSection from "@/components/HeroSection.js";
import Navbar from "@/components/Navbar";
import ScrollDirectionComponent from "@/components/ScrollDirectionComponent";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";



export default function Home() {

  
useEffect(()=>{
  const lenis = new Lenis();
  function raf(time){
    lenis.raf(time);
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
},[])


  return (
    <div className="!relative">
     
      <ScrollDirectionComponent/>
      <Navbar/>
    <HeroSection/>
    <Donors/>
    
  
    </div>
  );
}
