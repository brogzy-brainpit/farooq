import React, { useRef } from 'react'
import {motion, useScroll, useTransform} from 'framer-motion'
import useMouse from '@/hooks/useMouse'
import BrandName from './BrandName'
import MarqueeX from './MarqueeX'
import SlideUpText from '@/effects/SlideUpText'
import GridColumn from '@/layout/GridColumn'
import Section from '@/layout/Section'
import CustomBtn from './CustomBtn'

function Land({preloaderOut}) {
  const landingRef=useRef(null)
  const {scrollYProgress}=useScroll({target:landingRef,offset:["start start","end start"]})
  scrollYProgress.on("change",(v)=>{
    console.log(v)
  })
  const newX= useTransform(scrollYProgress,[0.35,1],[0,-80])
  const newY= useTransform(scrollYProgress,[0.35,1],[0,40])
    const {x,y}=useMouse({start:{x:-50,y:50},stiffness:120,damping:30,mass:0.1})
   const xMovement=useTransform(x,v=>v*.010) 
   const yMovement=useTransform(y,v=>v*.012) 
  return (
    <div ref={landingRef} className='relative h-svh w-full overflow-hidden bg-[#262626]'>
      
        <img src="/assets/car-background.png" alt="Land" className="absolute top-0 left-0 w-full h-full object-cover"/>
        <img src="/assets/car-background-mobile.png" alt="Land" className="aspect-[5/7] inline lg:hidden absolute top-0 left-0 w-full h-full object-cover"/>
  <MarqueeX numbers={6} speed={180}  className='absolute hidden lg:flex  top-0 left-0  w-full h-full  border-none bg-gree-600' >
  <h2 className=" w-full h-full fl gap-4  font-custom text-[#FCCE2F] mr-[12em] font-bod">
    <BrandName/> 
     </h2>
  </MarqueeX>

  <motion.div   style={{x:newX,y:newY}} className=" lg:inline hidden absolute top-0 left-0 w-full h-full">
        <motion.img
        animate={{x:preloaderOut?0:300,y:preloaderOut?0:-20,scale:preloaderOut?1:.95}}
        transition={{type:"tween",duration:1.8,ease:[0.22, 1, 0.36, 1]}}
          initial={{x:300,y:-20,scale:.95}}
          exit={{x:300,y:-20,scale:.95}}
          // animate={{x:preloaderOut?newX:300,y:preloaderOut?0:-20,scale:preloaderOut?1:.95}}
           src="/assets/car-alone.png" alt="Land" className="absolute top-0 left-0 w-full h-full object-cover"/>

  </motion.div>
  <motion.div   style={{x:newX,y:newY}} className=" aspect-[5/7] inline lg:hidden absolute top-0 left-0 w-full h-full">
        <motion.img
        animate={{x:preloaderOut?0:300,y:preloaderOut?0:-20,scale:preloaderOut?1:.95}}
        transition={{type:"tween",duration:1.8,ease:[0.22, 1, 0.36, 1]}}
          initial={{x:300,y:-20,scale:.95}}
          exit={{x:300,y:-20,scale:.95}}
          // animate={{x:preloaderOut?newX:300,y:preloaderOut?0:-20,scale:preloaderOut?1:.95}}
           src="/assets/car-alone-mobile.png" alt="Land" className="absolute top-0 left-0 w-full h-full object-cover"/>

  </motion.div>

        
 <div

  className="flex lg:hidden absolute top-0 left-0 items-end w-full h-full"
> <h2 className=" font-custom text-[#FCCE2F] text-[15em] leading-[.9] font-bod">
   {/* ANTOS CAR CARE */}
   <SlideUpText text={"ANTOS CAR CARE"} preLoaderOut={preloaderOut}/>
     </h2>
  </div>

  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <Section className="w-full h-full">
      
    <GridColumn   className="w-full h-full">
<div className=" col-start-1 col-span-full lg:col-start-7 lg:col-span-6 items-en self-end justify-end  flex  bg-white p-4  rounded-2xl">
<div className="flex-1 h-full flex gap-10 flex-col justify-between">
  <h2 className=" font-body text-para  text-brand-black leading-[1]">
  <SlideUpText
   text={"Doorstep car cleaning made easy. Eco-friendly, professional, and convenient—book your wash today!"}
   preLoaderOut={preloaderOut}/>
  </h2>
  <CustomBtn className='w-fit' href="/about" icon={true}>
    Book a call
    </CustomBtn>
</div>
{/* video contaniner */}
<motion.div
  className="flex-1 overflow-hidden"
  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
  animate={{
    clipPath: preloaderOut
      ? "inset(0% 0% 0% 0%)"
      : "inset(100% 0% 0% 0%)",
  }}
  transition={{
    duration: 1.2,
    ease: [0.76, 0, 0.24, 1],
  }}
>
  <video
    src="/videos/hero.mp4"
    autoPlay
    muted
    loop
    className="aspect-[7/4] w-full h-full object-cover rounded-2xl"
  />
</motion.div>
</div>
    </GridColumn>
      </Section>

  </div>
        </div>
  )
}

export default Land