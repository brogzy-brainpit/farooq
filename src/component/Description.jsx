
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Description() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"],
  });

  const lines = [
    "At Farooq, your car deserves more than a quick clean.",
    "From interior detailing to paint correction,",
    "we deliver meticulous, professional care",
    "that restores its fresh, refined finish.",
  ];

  return (
    <section
      ref={containerRef}
      className="w-full px-5 py-32"
    >
      <div className="max-w-[900px]">
        {lines.map((line, index) => {
          const start = index / lines.length;
          const end = (index + 1) / lines.length;

          return (
            <RevealLine
              key={index}
              line={line}
              progress={scrollYProgress}
              range={[start, end]}
            />
          );
        })}
      </div>
    </section>
  );
}

function RevealLine({ line, progress, range }) {
  const y = useTransform(
    progress,
    range,
    ["110%", "0%"]
  );

  const opacity = useTransform(
    progress,
    range,
    [0, 1]
  );

  return (
    <div className="overflow-hidden">
      <motion.div
        style={{
          y,
          opacity,
        }}
        className="
          text-heading2
          font-custom
          leading-[0.9]
          text-brand-white
        "
      >
        {line}
      </motion.div>
    </div>
  );
}