import React, { useEffect, useState } from 'react'
import { AnimatePresence,motion } from "framer-motion";
import { useRouter } from "next/router";
import { Anton,Instrument_Sans,DM_Sans,Hanken_Grotesk} from "next/font/google";
import Lenis from "@/providers/Lenis";

import "../styles/mostHave.css";
import "../styles/globals.css";

// import Footer from "@/components/Footer";
import localFont from "next/font/local";
import Script from "next/script";
// import SlideUpText from '@/effects/SlideUpText';
// import Header from '@/components/Header';
import Head from 'next/head';
import PageTransition from '@/component/PageTransition';
import Footer from '@/component/Footer';

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});
const custom = localFont({
  src:  "./fonts/HostGrotesk-VariableFont_wght.ttf",
  // src:  "./fonts/MonumentExtended-Ultrabold.otf",

  // weight: "100 200 300 400 500 600 700 800 900",
  variable: "--font-custom",
 
});
const custoom = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-custom",
  display: "swap",
});


export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
// console.log(router.pathname)
const [pageName,setPageName]= useState(router.pathname)
   const [preLoaderOut,setPreLoaderOut]=useState(false)

   const routeTitles= {
    '/':'welcome',
    '/about':'about us',
    '/contact':'contact',
    '/faqs':'FAQS',
    '/gallery':'Gallery [portfolio]',
    '/blog':'blog',
    
   }
   const getTitle= (route)=>{
    return routeTitles[route] || 'page'
   }
  useEffect(() => {
    setPreLoaderOut(true)

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const handleRouteChange=(url)=>{
      setPageName(url)
    }
    router.events.on('routeChangeStart',handleRouteChange)
    return ()=>{
    router.events.off('routeChangeStart',handleRouteChange)

    }
    // setPageName(router.pathname.replace('/',''))
  }, [router.events]);
  const AnimateSvg = {
  initial: {
    pathLength: 1 ,// ⬅️ start invisible
    strokeWidth:['60%'],
    //  transition:{ duration:1}

  },
  enter: {
    pathLength: 0, // ⬅️ draw forward
     strokeWidth:['60%', '30%', '20%', '18%','16%','10%','0%',],
     strokeLinecap:"round",
     transition:{ duration:1,delay:1.2}
  },
  exit: (i) => ({
    pathLength: 1, // ⬅️ reverse “cleaning” direction (end → start)
    strokeLinecap:"round",
    strokeWidth:['0%', '20%', '40%', '60%',],
    transition: { duration: 1,}
    
  })
}
  return (
    <Lenis>

    <AnimatePresence
      mode="wait"
      // onExitComplete={() =>setPreLoaderOut(true)}
    >
      {/* <Header preLoaderOut={preLoaderOut}/> */}
 {/* 🔥 GLOBAL SEO METADATA */}
      <Head>
        <title>Carwash website Demo</title>

        <meta
          name="description"
          content="Premium mobile car detailing in Miami, FL. Interior and exterior cleaning that restores shine, comfort, and showroom-quality results. Book today."
        />

        <meta
          name="keywords"
          content="car detailing Miami, mobile car wash Miami, auto detailing Miami FL, interior car cleaning Miami, exterior car detailing Miami"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Mobile Car Detailing in Miami, FL" />
        <meta
          property="og:description"
          content="Restore your car to showroom condition with Shine Carwash Mobile. Professional interior & exterior detailing."
        />
        <meta property="og:image" content="http://res.cloudinary.com/brainpit/image/upload/v1775918888/vjmy1mrnjmnxeixuxhnq.png" />
        <meta property="og:url" content="https://shine-carwash-mobile.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shine Carwash Mobile" />
        <meta
          name="twitter:description"
          content="Expert mobile car detailing in Miami. Interior & exterior services that bring back your car’s shine."
        />
        <meta name="twitter:image" content="http://res.cloudinary.com/brainpit/image/upload/v1775918888/vjmy1mrnjmnxeixuxhnq.png" />

        {/* Geo */}
        <meta name="geo.region" content="US-FL" />
        <meta name="geo.placename" content="Miami" />

        {/* JSON-LD (SEO BOOST) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoWash",
              name: "Shine Carwash Mobile",
              url: "https://shine-carwash-mobile.vercel.app/",
              image: "http://res.cloudinary.com/brainpit/image/upload/v1775918888/vjmy1mrnjmnxeixuxhnq.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "250 NE 25th St",
                addressLocality: "Miami",
                addressRegion: "FL",
                postalCode: "33137",
                addressCountry: "US",
              },
              areaServed: {
                "@type": "City",
                name: "Miami",
              },
              serviceType: [
                "Car Detailing",
                "Mobile Car Wash",
                "Interior Detailing",
                "Exterior Detailing"
              ],
              description:
                "Shine Carwash Mobile provides premium mobile car detailing services in Miami, Florida.",
            }),
          }}
        />
      </Head>

      <div
        key={router.asPath}
        className={`${body.variable} ${custom.variable}`}
      >
        <PageTransition/>       
        <Component {...pageProps} />     
        <Footer />
      </div>
    </AnimatePresence>
    </Lenis>
  );
}
