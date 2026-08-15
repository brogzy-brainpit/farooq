import React from "react";
import { motion } from "framer-motion";

function PageTransition() {
  const arr = [
    "#262626",
    "#FCCE2F",
    "#262626",
    "#FCCE2F",
    "#262626",
    "#FCCE2F",
    "#262626",
    "#FCCE2F",
    "#262626",
    "#FCCE2F",
  ];

  const variants = {
    initial: {
      scale: 1.5,
    },

    animate: (index) => ({
      scale: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1],
      },
    }),

    exit: (index) => ({
      scale: 1.5,
      transition: {
        duration: 0.8,
        delay: (arr.length - 1 - index) * 0.1,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-preloader overflow-hidden pointer-events-none">
      {arr.map((color, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute top-0 left-0 w-full h-full rounded-full"
          style={{
            scale:1.4,
            backgroundColor: color,
            zIndex: arr.length - index,
          }}
        />
      ))}
    </div>
  );
}

export default PageTransition;