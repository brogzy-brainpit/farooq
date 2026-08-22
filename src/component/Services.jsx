import GridColumn from '@/layout/GridColumn'
import Section from '@/layout/Section'
import React from 'react'
import TravelGalleryDemo from './GlidingProjects'

function Services() {
  return (
    <div>

        <Section>
            <GridColumn>
                <div className="col-span-full mb-8 ">
                    <h2 className='font-custom leading-none capitalize text-brand-white text-display'>from our detailing services</h2>
                    </div>
                <div className="lg:col-span-6 col-span-full">
                    <p className='font-custom leading-[1] text-brand-white text-heading3'>
                        You can choose one of three premium capsule houses in our offer. Each of our capsules provides 
                        the highest quality and meets the standards adjusted to your needs. Choose the one you like.
                    </p>
                </div>
                <div className="lg:col-span-6  col-start-2 col-span-5">
                <TravelGalleryDemo/>
                </div>
            </GridColumn>
            </Section>
    </div>
  )
}

export default Services