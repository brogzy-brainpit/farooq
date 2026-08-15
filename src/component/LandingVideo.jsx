import React, { useRef, useEffect, useState } from "react"
import Image from "next/image"

function LandingVideo({ link, poster, preLoaderOut }) {
  const videoRef = useRef(null)
useEffect(() => {
  const video = videoRef.current

  if (!video) return

  video.playbackRate = 1.32

  if (preLoaderOut) {
    video.play().catch(() => {})
  } else {
    video.pause()
  }
}, [preLoaderOut])

  return (
    <>
      {/* Fallback / Poster Image */}
      {/* <Image
        src={poster}
        alt=""
        fill
        priority
        className={`absolute top-0 left-0 object-cover z-[1] transition-opacity duration-700`}
      /> */}

      {/* Video */}
      <video
        ref={videoRef}
        src={link}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] min-w-full min-h-full w-full h-full object-cover"
      >
        Your browser does not support this video tag.
      </video>
      <div className=' absolute z-10 top-0 left-0 bg-neutral-800/50 h-[120%] w-[120%] inset-0'/>

    </>
  )
}

export default LandingVideo