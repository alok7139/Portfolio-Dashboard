import React from 'react'
import Hero from './subcomponents/Hero'
import Timeline from './subcomponents/Timeline'
import About from './subcomponents/About'
import Skills from './subcomponents/Skills'
import Portfolio from './subcomponents/Portfolio'
import Myapps from './subcomponents/Myapps'
import Contact from './subcomponents/Contact'


function Home() {
  return (
    <article className='px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex  flex-col gap-14'>
      <Hero/>
      <About/>
      <Timeline/>
      <Skills/>
      <Portfolio/>
      <Myapps/>
      <Contact/>

    </article>
    // justify-center items-center ml-5
  )
}

export default Home
