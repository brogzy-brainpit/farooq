"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LandingVideo from "./LandingVideo";
import GridColumn from "@/layout/GridColumn";
import Section from "@/layout/Section";
import SlideUpText from "@/effects/SlideUpText";
import Header from "./Header";
import useMouse from "@/hooks/useMouse";
import MouseMovingDiv from "./MouseMovingDiv";

function Landing({ preloaderOut }) {
 const [scaleMouse, setScaleMouse] = useState(false)

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.8],
    [2 / 5, 1]
  );

  const padding = "14px";

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["16px", "32px"]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[400svh] w-full bg-brand-black"
      onMouseEnter={() => setScaleMouse(true)}
          onMouseLeave={() => setScaleMouse(false)}
    >

      {/* mouse movement on mouse movement */}
      {/* mouse movement on mouse movement */}
<MouseMovingDiv scaleMouse={scaleMouse} setScaleMouse={setScaleMouse}/>
      {/* mouse movement on mouse movement */}

      {/* HEADER USES THE SAME SCROLL PROGRESS */}
      <Header preLoaderOut={preloaderOut} scrollYProgress={scrollYProgress} />

      <div className="sticky top-0 left-0 h-svh w-full overflow-hidden">

        {/* VIDEO */}
        <motion.div
          style={{
            scale,
            borderRadius,

            top: padding,
            right: padding,
            bottom: padding,
            left: padding,

            transformOrigin: "bottom right",
          }}
          className="absolute overflow-hidden"
        >
          <Section className="bg-red800">
            <LandingVideo
              preLoaderOut={preloaderOut}
              link="/videos/hero.mp4"
            />
          </Section>
        </motion.div>

        {/* CONTENT */}
        <Section
          padding={false}
          className="relative mix-blend-difference z-header h-full px-5 pt-20 pb-5 lg:pt-10 lg:pb-10"
        >
          <GridColumn className="h-full w-full">

            <div className="col-span-4 lg:col-start-10  self-end lg:col-span-3">
              <h1 className="font-custom text-para leading-[1] text-brand-white">
                <SlideUpText
                  preLoaderOut={preloaderOut}
                  initialDelay={.4}
                  once
                  gap=".32em"
                  delay={0.008}
                  text="Your Car Deserves Better. Experience Luxury Car Detailing in Miami Today."
                />
              </h1>
            </div>

            <div className="col-span-3 col-start-1 self-end mb-12 lg:mb-0 lg:col-span-3">
              <h2 className="font-body text-para lg:text-heading3 leading-[1] text-brand-white">
                
                  <SlideUpText
                  preLoaderOut={preloaderOut}
                  initialDelay={.6}
                  once
                  gap=".32em"
                  delay={0.008}
                  text="We make premium detailing the new standard."
                />
              </h2>
            </div>

          </GridColumn>
        </Section>

      </div>
    </div>
  );
}

export default Landing;