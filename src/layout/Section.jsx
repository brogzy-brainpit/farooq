import React from 'react'

function Section({className,children,container=true,padding=true}) {
  return (
    <section className={` ${className}  ${container?'container2 mx-auto':''}  ${padding?'px-5 pb-[10em] pt-[13em] lg:pt-[14em] lg:pb-[10em] ':''}`}>
      {children}
    </section>
  )
}

export default Section