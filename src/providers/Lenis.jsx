"use client";
import React, { useEffect } from "react";
import Lenis from "lenis";


function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf:false,
      //  duration:4.2,
       touchMultiplier:2,
       smoothWheel:true,
      //  lerp:.3,
      // easing: (t) =>Math.pow(t,3),
    });
    // lenis.scrollTo(500,{duration:2,lerp:.1})
    // const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
   
    };
  }, []);

  return <div className="scroll-container">{children}</div>;
}

export default SmoothScroll;
