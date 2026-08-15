import GridColumn from '@/layout/GridColumn'
import Section from '@/layout/Section'
import { Facebook, Inbox, Instagram, Mail, PhoneCall, TwitterIcon, X } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div className='bg-[#EBEBEB] '>

        <Section>
            <GridColumn>
                <div className="flex flex-col gap-4 col-span-4">
                   <div className="flex flex-col gap-4 mb-5">
                    <div className=" flex gap-2">
                        <Mail height={20} width={20} /> 
                        <h2>info@antondetailing.com</h2>
                    </div> 
                    <div className=" flex gap-2">
                        <PhoneCall height={20} width={20} /> 
                        <h2>info@antondetailing.com</h2>
                    </div> 
                    
                  
                   </div>

                   <div className="flex gap-4">
                    <div className=" bg-brand-secondary border border-brand-black p-2 rounded-full ">
                        <TwitterIcon />
                    </div> <div className=" bg-brand-secondary border border-brand-black p-2 rounded-full ">
                        <Facebook />
                    </div> <div className=" bg-brand-secondary border border-brand-black p-2 rounded-full ">
                        <Instagram />
                    </div>
                  
                   </div>
                </div>

                  <div className="flex flex-col gap-4 col-span-2 ">
                    <h4 className='font-body font-bold text-para capitalize'>About</h4>
                    <p className='font-body text-sm capitalize '>our mission </p>
                    <p className='font-body text-sm capitalize '>our process </p>
                    <p className='font-body text-sm capitalize '>Contact </p>
                </div>
                 <div className="flex flex-col gap-4 col-span-2 ">
                    <h4 className='font-body font-bold text-para capitalize'>company</h4>
                    <p className='font-body text-sm capitalize '>our recipe </p>
                    <p className='font-body text-sm capitalize '>subscribe us </p>
                    <p className='font-body text-sm capitalize '>FAQ </p>
                </div>
                 <div className="flex flex-col gap-4 col-span-2 ">
                    <h4 className='font-body font-bold text-para capitalize'>support</h4>
                    <p className='font-body text-sm capitalize '>support centre </p>
                    <p className='font-body text-sm capitalize '>Feedback </p>
                    <p className='font-body text-sm capitalize '>accessibility </p>
                </div>
                  <div className="flex flex-col gap-4 col-span-2">
                    <h4 className='font-body font-bold text-para capitalize'>get in touch</h4>
                    <p className='font-body text-sm '>
                        4517 Washington ave. <br/>
                        Manchester, <br/>
                        Kentucky 39495
                        </p>
                </div>
            </GridColumn>
        </Section>
        
    </div>
  )
}

export default Footer