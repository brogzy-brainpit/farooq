import { useEffect, useState } from "react";
import Land from "@/component/Land";
import LocalTime from "@/component/LocalTime";
import Section1 from "@/component/Section1";
import Mask from "@/component/Mask";
import Landing from "@/component/Landing";
import Services from "@/component/Services";


export default function Home() {
  const [preLoaderOut,setPreLoaderOut]=useState(false)

  useEffect(()=>{

   const timer=  setTimeout(() => {
    setPreLoaderOut(true)
    document.body.style.cursor="default"
    window.scrollTo({top:0})
    }, 1400);
    return ()=>clearTimeout(timer)
  },[])
  return (
    <main
      className={`h-full w-full bg-brand-black`}
    >
      {/* <LocalTime/> */}
    <Landing preloaderOut={preLoaderOut}/>
<Section1/>
<Services/>
<Mask/>
    </main>
  );
}
