
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const images = [
  {
    title: 'mercedez, 2024',
    hero: '/assets/red-benz.png',
    image: ['/assets/red1.webp','/assets/red2.webp','/assets/red1.webp']
  },
  {
    title: 'The Tiger',
    hero: '/assets/tiger04.jpg',
    image: ['/assets/tiger01.jpg','/assets/tiger02.jpg','/assets/tiger03.jpg']
  },
  {
    title: 'Rhino Territory',
    hero: '/assets/rhino01.jpg',
    image: ['/assets/rhino02.jpg','/assets/rhino03.jpg','/assets/rhino04.jpg']
  },
  // {
  //   title: 'Abstract Form',
  //   hero: '/assets/002.png',
  //   image: ['/assets/001.png','/assets/002.png','/assets/003.png']
  // },
  // {
  //   title: 'Final State',
  //   hero: '/assets/003.png',
  //   image: ['/assets/001.png','/assets/002.png','/assets/003.png']
  // },
]

export default function Portfolio() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={sectionRef} className="relative h-00vh] bg-black">
      <StickyVisual progress={scrollYProgress} />
      <Content images={images} />
    </section>
  )
}







function StickyVisual({ progress }) {
  return (
    <div className="sticky top-0 h-screen w-full">
      <div className="relative h-full w-full overflow-clip">

        {/* 👇 TITLE UI */}
        <StickyTitle progress={progress} />

        {/* 👇 IMAGES */}
        {images.map(({ hero }, i) => (
          <RevealImage
            key={i}
            src={hero}
            index={i}
            progress={progress}
          />
        ))}

      </div>
    </div>
  )
}



function StickyTitle({ progress }) {
  return (
    <div className="pointer-events-none absolute top-6 left-6 z-20">
      {images.map((image, index) => (
        <StickyTitleItem
          key={index}
          title={image.title}
          index={index}
          total={images.length}
          progress={progress}
        />
      ))}
    </div>
  );
}

function StickyTitleItem({
  title,
  index,
  total,
  progress,
}) {
  // EXACT SAME TIMING AS RevealImage
  const revealStart = (index + 0.1) / total;
  const revealEnd = (index + 0.4) / total;

  const scaleStart = revealEnd;
  const scaleEnd = (index + 0.95) / total;

  /*
   * TITLE
   *
   * Fade in just after image begins revealing.
   * Stay visible throughout the image's scale.
   * Fade out near the end.
   */

  const fadeInStart = revealStart;
  const fadeInEnd =
    revealStart + (revealEnd - revealStart) * 0.8;

  const fadeOutStart =
    scaleEnd - (scaleEnd - scaleStart) * 0.1;

  const fadeOutEnd = scaleEnd;

 const opacity = useTransform(
  progress,
  [
    fadeInStart,
    fadeInEnd,
    fadeOutStart,
    fadeOutEnd,
  ],
  index === 0
    ? [1, 1, 1, 0]
    : [0, 1, 1, 0]
);
  const y = useTransform(
    progress,
    [fadeInStart, fadeInEnd],
    [20, 0]
  );

  return (
    <motion.h2
      style={{
        opacity,
        y,
      }}
      className="
        absolute
        text-white
        text-heading2
        lg:text-heading1
        font-custom
        font-medium
        tracking-tight
        whitespace-nowrap
      "
    >
      {title}
    </motion.h2>
  );
}




function RevealImage({ src, index, progress }) {
  const total = images.length

  // 1️⃣ CLIP REVEAL
  const revealStart =(index + 0.1) / total
  // const revealEnd = (index + 0.3) / total
  const revealEnd = (index + 0.4) / total

  const reveal = useTransform(
    progress,
    [revealStart, revealEnd],
    [100, 0]
  )

  const clipPath = useMotionTemplate`
    inset(${reveal}% 0 0 0)
  `

  // 2️⃣ SCALE (only AFTER fully revealed)
  const scaleStart = revealEnd
  const scaleEnd = (index + 0.95) / total

  const scale = useSpring(useTransform(
    progress,
    [scaleStart, scaleEnd],
    [1.15,1]
  ), { stiffness: 400, damping: 90 })

  return (
    <motion.div
      style={{
        clipPath: index === 0 ? 'none' : clipPath,
        scale,
      }}
      className="absolute inset-0"
    >
      <Image
        src={src}
        fill
        className="object-cover"
        alt="car detailing in miami"
        quality={90}
        priority
      />
    </motion.div>
  )
}





function Content({ images }) {
  return (
    <div className="relative z-10">
      {images.map(({image}, i) => (
        <div
          key={i}
          className="h-[200vh] relative flex flex-col gap-4 items-end justify-end lg:px-10 px-5 text-white"
        >
          {image.map((img)=>{
         return  <div className='relative w-[9em] lg:w-[13em] aspect-square'>
          <Image fill  loading='lazy' src={img} className=' object-cover h-full w-full '/> 
          </div>
          })}
        </div>
      ))}
    </div>
  )
}
