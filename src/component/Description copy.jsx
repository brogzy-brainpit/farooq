
import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Description() {
    const textRef2=useRef(null)
     const container = useRef();
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end start']
    })
  // const secondPara= "How i can Help?".split(" ")
    const secondPara2= "At Farooq, your car deserves more than a quick clean. From interior detailing to paint correction, we deliver meticulous, professional care that restores its fresh, refined finish.".split(" ")
    const opacity = useTransform(scrollYProgress, [0, 1], ["0", "1"])
   const {scrollYProgress:ss}= useScroll({
      target:textRef2,
      offset:["0.2 end",'end 0.4']
    })
    return (
        <div ref={container} className=' '>
            <h1 ref={textRef2} once={true}  className=" text-heading2 text-brand-white font-custom leading-[.9] gap-3 flex flex-wrap" gap='10px'>
{secondPara2.map((word,i)=>{
    var start= i/secondPara2.length;
    var end= start+ (1/secondPara2.length);
    return <Word key={i} range={[start,end]} word={word} progress={ss}/>
  })}
</h1>
            {/* <motion.p style={{opacity,}} className='text-[7.5vw] font-custom uppercase text-center max-w-[50vw] leading-none'>The quick brown fox jumps over the lazy dog</motion.p> */}
        </div>
    )
}

const Word=({word,progress,range})=>{
    const textOpacity= useTransform(progress,range,[0,1])
    return(
  <span className='relative text-customColor text-center flex justify-center'>
    <span style={{opacity:0.09}}   className='mr-[.1em] absolute text-center flex justify-center' >{word}</span>
    <motion.span style={{opacity:textOpacity}}   className='mr-[.1em]' >{word}</motion.span>
  
  </span>
    )
  }
