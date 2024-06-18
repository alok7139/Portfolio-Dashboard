import { Card } from '@/components/ui/card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Myapps() {
  const [softwareapplication, setsoftwareapplication] = useState("")

  useEffect(() => {
    const getmysoftwareapplication = async() => {
      const {data} = await axios.get("https://portfolio-backened-qaau.onrender.com/application/getall" , {withCredentials:true})

      setsoftwareapplication(data.softwareapplication)
    }

    getmysoftwareapplication();
  } ,[])
  return (
    <>
       <div className='w-full flex flex-col gap-8 sm:gap-12'>
        <h1 className='text-tubeLight-effect dancing_text text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] mx-auto w-fit text-center'>Web Tools</h1>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
           {
            softwareapplication && softwareapplication.map((ele) =>{
              return (
                <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3" key={ele._id}>
                  <img src={ele.svg && ele.svg.url} alt={ele.name} className='h-12 sm:h-24 w-auto'/>
                  <p className='text-muted-foreground text-center text-xl font-semobold text-white'>{ele.name}</p>
                </Card>
              )
            })
           }
        </div>
      </div>
    </>
  )
}

export default Myapps
