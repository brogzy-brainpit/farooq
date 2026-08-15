"use client";

import React from "react";
import { motion, useTransform } from "framer-motion";
import Section from "@/layout/Section";
import FarooqLogo from "./FarooqLogo";
import useWindow from "@/hooks/useWindow";

function Header({ scrollYProgress }) {
  const { dimension } = useWindow();

  const logoWidth = 100;

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

  return (
    <header className="fixed top-0 inset-x-0 z-header">
      <Section
        padding={false}
        className="relative px-5 pt-20 pb-5 lg:pt-10 lg:pb-10"
      >
        <motion.div
          style={{
            scale,
            transformOrigin: "top left",
          }}
          className="
            w-fit
            origin-top-left
            mix-blend-difference
            text-brand-white
          "
        >
          <FarooqLogo width={logoWidth} />
        </motion.div>
      </Section>
    </header>
  );
}

export default Header;