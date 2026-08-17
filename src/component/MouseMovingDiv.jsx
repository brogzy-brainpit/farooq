import React, { useState } from 'react'
import {motion, useTransform} from 'framer-motion'
import useMouse from '@/hooks/useMouse'

function MouseMovingDiv({scaleMouse }) {

  const { x, y } = useMouse({
    start: { x: 480, y: 300 },
    stiffness: 140,
    damping: 18,
    mass: 0.1,
  })

  const newX = useTransform(x, (x) => x - 50)
  const newY = useTransform(y, (y) => y - 50)
  return (
   <motion.div
            animate={{ scale: scaleMouse ? 1 : 0 }}
            style={{ x: newX, y: newY, scaleMouse: 0 }}
            className="z-10 font-body mix-blend-difference pointer-events-none bg-brand-white text-brand-black font-medium capitalize fixed flex items-center justify-center top-0 left-0 h-[80px] w-[80px] rounded-full overflow-hidden"
          >
            scroll
          </motion.div>
  )
}

export default MouseMovingDiv