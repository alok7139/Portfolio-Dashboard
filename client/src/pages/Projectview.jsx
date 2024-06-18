import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function Projectview() {

  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [projectBanner, setprojectBanner] = useState("")
  const [gitrepolink, setgitrepolink] = useState("")
  const [projectLink, setprojectLink] = useState("")
  const [technologies, settechnologies] = useState("")
  const [stack, setstack] = useState("")
  const [deployed, setdeployed] = useState("")

  const {id} = useParams();

  useEffect(() => {
    const getproject = async() =>{
      await axios.get(`https://portfolio-backened-qaau.onrender.com/project/get/${id}` ,{withCredentials:true})
      .then((res) =>{
        // console.log(res);
        settitle(res.data.project.title)
        setdescription(res.data.project.description)
        setprojectBanner(res.data.project.projectBanner && res.data.project.projectBanner.url)
        setdeployed(res.data.project.deployed)
        setstack(res.data.project.stack)
        setgitrepolink(res.data.project.gitrepolink)
        setprojectLink(res.data.project.projectLink)
        settechnologies(res.data.project.technologies)
      }).catch((error) => {
        toast.error(error.response.data.message)
      })


    }

    getproject();
  } , [id])

  const descriptionListFOrmat = description.split(". ");
  const technologiesListFOrmat = technologies.split(", ");
  

  return (
   <>
       <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
      <div className='w-[100%] px-5 md:w-[1000px] ' >
        <div className='space-y-12 '>
          <div className='border-b border-gray-900/10 pb-12'>
              
                <div className='mt-10 flex flex-col gap-5'>
                  <div className='w-full sm:col-span-4'>
                      <h1 className='text-4xl font-bold mb-4'>{title} Project</h1>
                       <img src={projectBanner ? projectBanner : 'https://kinsta.com/wp-content/uploads/2021/03/wordpress-featured-image-not-showing-1024x512.png'}  alt={title} 
                        className='w-96 h-auto'
                       />
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <p className='text-2xl mb-2 underline'>Description</p>
                      <ul className='list-disc'>
                         {
                          descriptionListFOrmat.map((item,index) => {
                            return (
                              <li key={index}>{item}</li>
                            )
                          })
                         }
                      </ul>
                  </div>


                  <div className='w-full sm:col-span-4'>
                    <p className='text-2xl mb-2 underline'>Technologies</p>
                      <ul className='list-disc'>
                         {
                          technologiesListFOrmat.map((item,index) => {
                            return (
                              <li key={index}>{item}</li>
                            )
                          })
                         }
                      </ul>
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <p className='text-2xl mb-2 underline'>Stack</p>
                      <p>{stack}</p>
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <p className='text-2xl mb-2 underline'>Deployed</p>
                      <p>{deployed}</p>
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <p className='text-2xl mb-2 underline'>GitHub Repo Link</p>
                      <Link to={gitrepolink} target='_blank' className='text-sky-700'>{gitrepolink} </Link>
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <p className='text-2xl mb-2 underline'>Project Link</p>
                      <Link to={projectLink ? `${projectLink}` : '/'} target='_blank' className='text-sky-700'>{projectLink ? `${projectLink}` : 'Not Deployed'}</Link>
                  </div>

                  
                  


                 
          
        


                  

                </div>
            </div> 

        </div>

      </div>

    </div>
   </>
  )
}

export default Projectview

