import { useEffect, useState } from "react";
import Land from "@/component/Land";
import LocalTime from "@/component/LocalTime";
import Section1 from "@/component/Section1";
import Landing from "@/component/Landing";
import Services from "@/component/Services";
import Portfolio from "@/component/Portfolio";
import LeadMagnet from "@/component/LeadMagnet";
import ExpandingGridsImageGalleryDemo from "@/component/ExpandingGrids";


export default function Home({preLoaderOut}) {
  return (
    <main
      className={`h-full w-full bg-brand-black`}
    >
      {/* <LocalTime/> */}
      <LeadMagnet/>
<Landing preloaderOut={preLoaderOut}/>
<Section1 />
<ExpandingGridsImageGalleryDemo/>
<Services />
<Portfolio />
    </main>
  );
}
