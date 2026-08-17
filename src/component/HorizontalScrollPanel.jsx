// import Copy from '@/effects/Copy';
// import GridColumn from '@/layout/GridColumn';
import { useScroll, useTransform ,motion, useSpring} from 'framer-motion'
import React, { useRef } from 'react'

import SlideUpText from '@/effects/SlideUpText';
import { useMediaQuery } from 'react-responsive';
import ImageEffect from '@/effects/ImageEffect';
import Image from 'next/image';

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
  return (
   <section ref={ref} className='relative h-[400svh] w-full bg-red400'>
    <div className="lg:sticky lg:top-0 lg:h-svh  overflow-hidden">
      <motion.div style={{x:isTabletOrMobile?0:x}} className='lg:w-[270vw] w-full flex-col lg:flex-row gap-4 p-4 flex h-full'>

{service.map(({title,src,id},index)=>{
  return (
    <div key={index} className='relative lg:w-[90vw] h-[60svh] lg:h-auto  w-full items-center justify-center text7xl text-black'>
          <div className='absolute top-0 inset-0 w-full h-full flex overflow-hidden lg:rounded-3xl rounded-xl  justify-between flex-col'>
            <Image src={src} fill className='w-full object-cover'/>
          </div>

          <div className='absolute inset-0 bg-neutral-900/30'/>

          <div className="relative p-6 w-full h-full  flex justify-between flex-col">
            <div className="up">
            <h2 className='text-heading1 font-custom capitalize text-brand-white'>{title}</h2>
            </div>
            <div className="down flex">
              <h4 className="font-body text-brand-white border border-brand-white p-2 rounded-lg">
              {id}/{service.length}
              </h4>
            </div>
          </div>
        </div>

  )
})}
        
        

       
       

      </motion.div>
    </div>

   </section>
  )
}


const Content=({className='',color='#000',text,src='/images/003.png'})=>{
  return (
    <div   >
            <h2>
              {/* <SlideUpText text={text} preLoaderOut={true}/> */}
              {text}
            </h2>
            {/* <img className={` ${className} max-w-[30em] my-2 object-cover  h-[40svh]`} src={src}/> */}
             <ImageEffect height='40vh' color={color} className='max-w-[30em] my-2 object-cover  h-[20svh]' img={src} />
              </div>
  )
}
export default HorizontalScrollPanel