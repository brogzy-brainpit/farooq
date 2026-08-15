import React, { useRef } from 'react'
import {useScroll,motion, useTransform,useSpring} from 'framer-motion'
import Image from 'next/image'

function Mask() {
    const scrollTracker= useRef(null)
    const {scrollYProgress}=useScroll({target:scrollTracker,offset:['start start','end end']})
   
           const scale=useSpring(useTransform(scrollYProgress,[0,1],[0,1]),{stiffness:120,damping:10,mass:.2})

// const arr= [6,5,4,3,2,1]
const arr= [6,5,4,3,2,1]
// const MotionImage=motion(Image)
  return (
    <div ref={scrollTracker}   className='relative h-[300vh]  fle justify-center items-center'>
      <div className='sticky overflow-hidden top-0 w-full h-screen bg-brand-white flex  items-center justify-center' >
        <motion.div style={{scale}} className=' overflow-hidden banner-img-container relative w-full h-full will-change-transform'>
            <div className="img "><Image quality={50} 
                 priority 
                 fill className='w-full object-cover h-screen object-[50%_14%]'
                   src='/assets/car-background.png' /></div>
             {/* Mask layers */}
          {arr.map((a, i) => (
            <MaskLayer
              key={i}
              index={i}
              zIndex={a}
              total={arr.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
    </motion.div>
     {/* <div className='flex items-center justify-center gap-4 absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
           {'lorem ipsum dolor'.split(" ").map((word,i)=>{
           const opacity=useSpring(useTransform(scrollYProgress,[0.5+i*.1,1-i*.1],[0,1]),{stiffness:120,damping:10,mass:.2})

            return (
                <motion.span className='text-heading2 text-white font-custom2' style={{opacity}}>{word}</motion.span>
            )
           })}
            </div> */}
        </div>

        </div>
       
  )
}
function MaskLayer({ index, zIndex, scrollYProgress, total }) {
  const startScale = index / (total - .6);

  const scale = useTransform(
    scrollYProgress,
    [0.15, 0.8],
    [startScale, 1]
  );

  return (
    <motion.div
      style={{
        scale,
        zIndex,
      }}
      className="absolute top-0 left-0 w-full h-full will-change-transform"
    >
      <Image
        src="/assets/car-alone.png"
        fill
        quality={95}
        alt=""
        sizes="100vw"
        className="w-full h-screen object-cover object-[50%_14%]"
      />
    </motion.div>
  );
}
export default Mask