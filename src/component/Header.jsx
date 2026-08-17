"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import Section from "@/layout/Section";
import FarooqLogo from "./FarooqLogo";
import useWindow from "@/hooks/useWindow";
import { usePathname } from "next/navigation";
import { customEase2 } from "../../data";

function Header({ scrollYProgress,preLoaderOut }) {
  const { dimension } = useWindow();

  const logoWidth = 150;

  const isMobile = dimension.width < 768;

  const targetWidth =
    dimension.width * (isMobile ? 0.85 : 0.6);

  const initialScale =
    dimension.width > 0
      ? targetWidth / logoWidth
      : 1;

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [initialScale, 1]
  );

   const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);
  return (
    <header className="fixed top-0 inset-x-0 z-header mix-blend-difference">
      <Section
        padding={false}
        className="relative px-5 p-10 pb-5 lg:pt-10 lg:pb-10 flex justify-between items-center"
      >
        <motion.div
          style={{
            scale,
            transformOrigin: "top left",
          }}
          className="w-fit
            origin-top-left
            mix-blend-differen
            text-brand-white">
          <FarooqLogo width={logoWidth} />
        </motion.div>
        
         <motion.div
        className="scale-100 isolate mix-blend-normal"
        initial={{ scale: 0 }}
        animate={{ scale: preLoaderOut?1:0 }}
        transition={{ delay:1.4,duration: 1, ease:customEase2 }}
      >
        <div
          onClick={() => setIsActive(!isActive)}
          className="relative flex h-[60px] w-[60px]
           cursor-pointer items-center justify-center
            rounded-full bg-brand-background"
        >
          <div className="relative z-[1] w-full">

            {/* Top line */}
            <span
              className={`absolute left-1/2 h-[1px] w-[40%] -translate-x-1/2 bg-white transition-all duration-300 ${
                isActive
                  ? '-translate-y-0 rotate-45'
                  : '-translate-y-[5px]'
              }`}
            />

            {/* Bottom line */}
            <span
              className={`absolute left-1/2 h-[1px] w-[40%] -translate-x-1/2 bg-white transition-all duration-300 ${
                isActive
                  ? 'translate-y-0 -rotate-45'
                  : 'translate-y-[5px]'
              }`}
            />
          </div>
        </div>
      </motion.div>


      </Section>
    </header>
  );
}

export default Header;