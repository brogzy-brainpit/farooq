import GridColumn from '@/layout/GridColumn'
import Section from '@/layout/Section'
import React, { useRef } from 'react'
import TypographyReveal from './TextReveals'
import Description from './Description'
import ParallaxImage from './ParallaxImage'

function Section1() {
  const track=useRef(null)
  return (
    <div className='min-h-svh'>
        
        <Section>
          <GridColumn>
            <div className="col-span-full lg:col-span-11 mb-[8em]">
              <Description/>
            </div>

            <div ref={track} className="col-span-5 col-start-2 lg:col-start-1 lg:col-span-5 aspect-[7/5]">
              <ParallaxImage track={track} src={"/assets/yellow-car.png"}/>
            </div>
             <div className="col-start-2 col-span-4 lg:col-start-7 lg:col-span-6 ">
                <TypographyReveal className='font-custom text-brand-white text-heading3 capitalie leading-[1.1]'
    toColor='#f6efe4'
      animationType='fadeInUp'
       fromDirection='left'
        revealType='word'  >
Expert Car Detaiing: from luxury brands to your everyday ride in Miami
      </TypographyReveal>
            </div>
          </GridColumn>
        </Section>
        
        </div>
  )
}

export default Section1