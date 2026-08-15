import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import React, { useRef } from 'react'

function ParallaxImage({src,track}) {
     const {scrollYProgress}= useScroll({target:track,offset:['start end','end start']})

  //  const y= useTransform(scrollYProgress,[0,1],['-190px', '0px'])
   const y= useSpring(useTransform(scrollYProgress,[0,1],['-45%', '0%']),{stiffness: 200 ,damping:30,mass:.2})

   const MotionImage=motion(Image)
  return (
      <div className='w-full h-full  relative overflow-hidden '>
    <MotionImage 
    style={{y,scale:1.35}}
             className="object-cover w-full h-full  object-[50%_0%]" 
             src={src} 
             fill={true}/>
             </div>
  )
}

export default ParallaxImage