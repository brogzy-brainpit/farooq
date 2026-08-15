"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LandingVideo from "./LandingVideo";
import GridColumn from "@/layout/GridColumn";
import Section from "@/layout/Section";
import SlideUpText from "@/effects/SlideUpText";
import FarooqLogo from "./FarooqLogo";

function Landing({preloaderOut}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /*
   * VIDEO STARTS SMALL
   * AND GROWS TO ITS MAXIMUM SIZE
   */
  const scale = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1 / 3, 1]
  );

  /*
   * KEEP A FIXED BREATHING SPACE
   *
   * Change this to whatever you want:
   *
   * 24px
   * 32px
   * 40px
   * 5vw
   */
  const padding = "14px";

  /*
   * RADIUS ALSO REDUCES
   */
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["16px", "32px"]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[400svh] w-full bg-[linear-gradient(115deg,#000000,#333333)]"
    >
      <div
        className="
          sticky
          top-0
          left-0
          h-svh
          w-full
          overflow-hidden
          
        "
      >

        <motion.div
          style={{
            scale,
            borderRadius,

            /*
             * THIS IS THE IMPORTANT PART
             */
            top: padding,
            right: padding,
            bottom: padding,
            left: padding,

            transformOrigin: "bottom right",
          }}
          className="
            absolute
            overflow-hidden
          "
        >
        <Section className={"bg-red800 "}>

          <LandingVideo preLoaderOut={preloaderOut}
            link="/videos/hero.mp4"
          />
          </Section>
        </motion.div>
       
<Section
  padding={false}
  className="h-full px-5 pt-20 pb-5 lg:pt-10 lg:pb-10 relative z-header"
>
  <GridColumn className="h-full w-full">

    <div className="col-span-6 mix-blend-difference text-brand-white">
      <FarooqLogo />
    </div>

    <div className="col-span-4 lg:col-start-10 lg:col-span-3 mix-blend-difference">
      <h1 className="font-custom text-para leading-[1] text-brand-white">
        <SlideUpText
          preLoaderOut={preloaderOut}
          text="Your Car Deserves Better. Experience Luxury Car Detailing in Miami Today."
        />
      </h1>
    </div>

    <div className="col-span-3 lg:col-span-3 self-end col-start-1 mix-blend-difference">
      <p className="font-body text-para lg:text-heading3 leading-[1] text-brand-white">
        We make premium detailing the new standard.
      </p>
    </div>

  </GridColumn>
</Section>
      </div>
    </div>
  );
}

export default Landing;