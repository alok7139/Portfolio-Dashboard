import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Portfolio() {
  const [projects, setprojects] = useState([])
  const [viewall, setviewall] = useState(false)

  useEffect(() => {
    const getmyproject = async() => {
      const {data} = await axios.get("https://portfolio-backened-qaau.onrender.com/project/getall" , {withCredentials:true})
      // console.log(data)
      setprojects(data.projects)
    }

    getmyproject();
  } ,[])

  return (
    <>
      <div>
      <div className='relative mb-12'>
             <h1 className='hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem]
             leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[12px] mx-auto w-fit font-extrabold' 
             style={{background:"hsl(222.2 84% 4.9%"}}>
              MY
              <span className='text-tubeLight-effect font-extrabold'>PORTFOLIO</span>
              
             </h1>

             <h1 className='flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem]
             leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[9px] mx-auto w-fit font-extrabold' 
             style={{background:"hsl(222.2 84% 4.9%"}}>
              <span className='text-tubeLight-effect font-extrabold'>PORTFOLIO</span>
              
             </h1>

             <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
             
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {
                viewall ? projects && projects.map((ele) => {
                  return (
                    <Link key={ele._id} to={`/project/${ele._id}`}>
                      <img src={ele.projectBanner && ele.projectBanner.url} alt={ele.title}/>
                    </Link>
                  )
                })
                : projects && projects.slice(0,9).map((ele) => {
                    return (
                      <Link key={ele._id} to={`/project/${ele._id}`}>
                      <img src={ele.projectBanner && ele.projectBanner.url} alt={ele.title}/>
                    </Link>
                    )
                })
            }
          </div>

          {/* {
            projects && projects.length>6 && (
              <div className='w-full text-center my-9'>
                <Button className="w-52" onClick={() => setviewall(!viewall)}>
                  {viewall ? "Show Less" : "Show More"}
                </Button>
              </div>
            )
          } */}

      </div>
    </>
  )
}

export default Portfolio
