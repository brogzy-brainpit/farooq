// import Copy from '@/effects/Copy';
// import GridColumn from '@/layout/GridColumn';
import { useScroll, useTransform ,motion, useSpring} from 'framer-motion'
import React, { useRef } from 'react'

import SlideUpText from '@/effects/SlideUpText';
import { useMediaQuery } from 'react-responsive';
import ImageEffect from '@/effects/ImageEffect';
import Image from 'next/image';
import ParallaxImage from './ParallaxImage';

function HorizontalScrollPanel() {
  const ref=useRef(null)
   const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  // const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']})
  const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']})
  scrollYProgress.on('change',(progress)=>{
    console.log(progress)

  })
  const x1= useTransform(scrollYProgress,[0,.8],[isTabletOrMobile?'0%':'0%','-63%']);
  const x= useSpring(x1,{stiffness:180,damping:20,mass:.3});
const service= [
  {title:"title 001",src:"/assets/yellow-car.png",id:1},
  {title:"title 002",src:"/assets/red-benz.png",id:1},
  {title:"title 003",src:"/assets/red1.webp",id:1},
]
const tracks = useRef([]);
const setTrackRef = (index) => (element) => {
  tracks.current[index] = element;
};
  return (
   <section ref={ref} className='relative h-[400svh] w-full bg-red400'>
    <div className="lg:sticky lg:top-0 lg:h-svh  overflow-hidden">
      <motion.div style={{x:isTabletOrMobile?0:x}} className='lg:w-[270vw] w-full flex-col lg:flex-row gap-4 p-4 flex h-full'>

{service.map((item, index) => (
  <ServiceCard
    key={item.id}
    track={ref}
    title={item.title}
    src={item.src}
    id={index + 1}
    total={service.length}
  />
))}
      </motion.div>
    </div>

   </section>
  )
}

function ServiceCard({ title,track, src, id, total }) {
  return (
    <div className="relative lg:w-[90vw] h-[60svh] lg:h-auto w-full">
      <div
        ref={track}
        className="absolute inset-0 w-full h-full overflow-hidden lg:rounded-3xl rounded-xl">
        <ParallaxImage src={src} offset={["start start", "end end"]}
          track={track} parallaxOnX 
          parallaxOnY={false} fill className="w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-neutral-900/30" />

      <div className="relative px-5 py-4 w-full h-full flex justify-between flex-col">
        <h2 className="text-heading1 font-custom capitalize text-brand-white">
          {title}
        </h2>

        <div>
          <h4 className="font-body text-brand-white border border-brand-white p-2 rounded-lg">
            {id}/{total}
          </h4>
        </div>
      </div>
    </div>
  );
}
export default HorizontalScrollPanel