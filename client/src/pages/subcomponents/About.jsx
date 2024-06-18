import axios from 'axios'
import React, { useEffect, useState } from 'react'

function About() {

  const [user, setuser] = useState({})

  useEffect(() => {
    const getmyprofile = async() => {
      const {data} = await axios.get("https://portfolio-backened-qaau.onrender.com/user/portfolio" , {withCredentials:true})

      setuser(data.user)
    }

    getmyprofile();
  },[])
  return (
    <>
     <div className='w-full flex flex-col overflow-x-hidden'>
          <div className='relative'>
             <h1 className='flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem]
             leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[10px] mx-auto w-fit font-extrabold' 
             style={{background:"hsl(222.2 84% 4.9%"}}>
              ABOUT
              <span className='text-tubeLight-effect font-extrabold'>Me</span>
             </h1>
             <span className='absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200'>

             </span>
          </div>
          <div>
            <div className='grid md:grid-cols-2 my-8 sm:my-20 gap-14'>
              <div className='flex justify-center items-center'>
                <img src={user.avatar && user.avatar.url} alt={user.fullname} className='bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px]
                md:h-[350px] lg:h-[450px]'/>
              </div>
              <div className='flex justify-center flex-col tracking-[1px] text-xl gap-5'>
                  <span className='font-extrabold'>I'm Alok Garg 
                    <br/>
                    CSE Student</span>
               
                  <span>I am a highly motivated and results-driven Software Developer with a strong background in C and C++.</span>
                  <span> I am an adept web developer, skilled in creating responsive and user-friendly websites. </span>
                  <span>I thrive in collaborative environments, working seamlessly within teams to deliver exceptional results.</span>
              </div>
            </div>

          </div>
     </div>
    </>
  )
}

export default About
