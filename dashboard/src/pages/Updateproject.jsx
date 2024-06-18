import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { clearallprojecterrror, getallproject, resetprojectslice, updateproject } from '@/store/slices/projectslice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Specialloadingbutton from './subcomponents/Specialloadingbutton'
import { Button } from '@/components/ui/button'

function Updateproject() {

  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [projectBanner, setprojectBanner] = useState("")
  const [projectBannerpreview, setprojectBannerpreview] = useState("")
  const [gitrepolink, setgitrepolink] = useState("")
  const [projectLink, setprojectLink] = useState("")
  const [technologies, settechnologies] = useState("")
  const [stack, setstack] = useState("")
  const [deployed, setdeployed] = useState("")

  const {error,message,loading} = useSelector(state => state.project)
  const dispatch = useDispatch();

  const {id} = useParams();

  const handleprojectbannerpreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setprojectBanner(file)
      setprojectBannerpreview(reader.result)
    }
  }

  useEffect(() => {
    const getproject = async() =>{
      await axios.get(`https://portfolio-backened-qaau.onrender.com/project/get/${id}` ,{withCredentials:true})
      .then((res) =>{
        // console.log(res);
        settitle(res.data.project.title)
        setdescription(res.data.project.description)
        setprojectBanner(res.data.project.projectBanner && res.data.project.projectBanner.url)
        setprojectBannerpreview(res.data.project.projectBanner && res.data.project.projectBanner.url)
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

    if(error){
      toast.error(error);
      dispatch(clearallprojecterrror());
    }
    if(message){
      toast.success(message);
      dispatch(resetprojectslice());
      dispatch(getallproject());
    }
  } , [id , error,message,loading,dispatch])

 const handleupdate = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title" , title);
    formdata.append("description" ,description);
     formdata.append("gitrepolink" ,gitrepolink);
     formdata.append("projectLink" ,projectLink);
     formdata.append("technologies" ,technologies);
     formdata.append("stack" ,stack);
     formdata.append("deployed" ,deployed);
     formdata.append("projectBanner" ,projectBanner);
     dispatch(updateproject(id,formdata))
    //  console.log(id);
 }

  return (
    <>
      <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
      <form className='w-[100%] px-5 md:w-[1000px] ' onSubmit={handleupdate}>
        <div className='space-y-12 '>
          <div className='border-b border-gray-900/10 pb-12'>
          <div className='flex justify-between items-center'>
              <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center underline'>Update Projects</h2>
              <Link to={'/'}>
              <Button>Dashboard</Button>
              </Link>
              </div>
                <div className='mt-10 flex flex-col gap-5'>
                  <div className='w-full sm:col-span-4'>
                     <img src={projectBannerpreview ? projectBannerpreview : "https://fluentsmtp.com/wp-content/uploads/2022/07/How-to-Fix-WordPress-Media-Library-Not-Showing-Images-1-1024x536.png"}
                     alt='projectImage'
                     className='w-full h-auto'
                     />
                     <div className='relative'>
                       <input type='file' onChange={handleprojectbannerpreview} className='avatar-update-btn mt-4 w-full'/>

                     </div>
                  </div>
                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Project Title</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <input type='text' placeholder='Title' value={title} onChange={(e) => settitle(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>

                         </div>
                      </div>
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Description</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <Textarea type='text' placeholder='Tell about something your project' value={description} onChange={(e) => setdescription(e.target.value)} />

                         </div>
                      </div>
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Technologies</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <Textarea type='text' placeholder='HTML , CSS , JS...' value={technologies} onChange={(e) => settechnologies(e.target.value)} />

                         </div>
                      </div>
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Stack</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                     
                           <Select value={stack} onValueChange={(selected) => setstack(selected)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Project Stack">

                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Stack">Stack</SelectItem>
                              <SelectItem value="MERN">MERN</SelectItem>
                              <SelectItem value="MEAN">MEAN</SelectItem>
                              <SelectItem value="MEVN">MEVN</SelectItem>
                              <SelectItem value="NEXTJS">NEXTJS</SelectItem>
                              <SelectItem value="REACTJS">REACTJS</SelectItem>
                              <SelectItem value="PYTHON">PYTHON</SelectItem>
                            </SelectContent>
                           </Select>

                         </div>
                      </div>
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Deployed</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                     
                           <Select value={deployed} onValueChange={(selected) => setdeployed(selected)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Deployed ?">

                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="YES">YES</SelectItem>
                              <SelectItem value="NO">NO</SelectItem>
                             
                            </SelectContent>
                           </Select>

                         </div>
                      </div>
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Github Repo Link</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <input type='text' placeholder='LINK' value={gitrepolink} onChange={(e) => setgitrepolink(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>

                         </div>
                      </div>
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Deployed Link</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <input type='text' placeholder='LINK' value={projectLink} onChange={(e) => setprojectLink(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>

                         </div>
                      </div>
                  </div>
                  


                  
          
        


                  

                </div>
            </div> 

        </div>

        <div className='flex justify-center items-center w-full'>

        
        {
          loading ? <Specialloadingbutton content={'Loading...'} width={"w-52"}/> : <button onClick={handleupdate} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-52">Update</button>
         }
         </div>
        

      </form>

    </div>
    </>
  )
}

export default Updateproject
