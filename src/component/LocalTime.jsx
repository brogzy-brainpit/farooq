"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LocalTime() {
  const [time, setTime] = useState("");
  const [colonVisible, setColonVisible] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);

      setTime(formatted);
    };

    updateTime();

    const clockInterval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setColonVisible((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(blinkInterval);
    };
  }, []);

  if (!time) return null;

  const [hours, minutes] = time.split(":");

  return (
    <div className="flex items-center font-mono text-white">
      <span>{hours}</span>

      <motion.span
        animate={{
          opacity: colonVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.1,
        }}
        className="mx-[2px]"
      >
        :
      </motion.span>

      <span>{minutes}</span>
    </div>
  );
}