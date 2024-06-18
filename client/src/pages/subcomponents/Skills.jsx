import { Card } from '@/components/ui/card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Skills() {
  const [skills, setskills] = useState("")

  useEffect(() => {
    const getmyskills = async() => {
      const {data} = await axios.get("https://portfolio-backened-qaau.onrender.com/skill/get" , {withCredentials:true})

      setskills(data.skills)
    }

    getmyskills();
  } ,[])
  return (
    <>
     <div className='w-full flex flex-col gap-8 sm:gap-12'>
        <h1 className='text-tubeLight-effect dancing_text text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] mx-auto w-fit'>SKILLS</h1>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
           {
            skills && skills.map((ele) =>{
              return (
                <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3" key={ele._id}>
                  <img src={ele.svg && ele.svg.url} alt={ele.title} className='h-12 sm:h-24 w-auto'/>
                  <p className='text-muted-foreground text-white text-xl font-semibold text-center'>{ele.title}</p>
                </Card>
              )
            })
           }
        </div>
      </div>
    </>
  )
}

export default Skills
