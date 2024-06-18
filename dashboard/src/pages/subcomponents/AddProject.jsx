import React, { useEffect, useState } from 'react'
import Specialloadingbutton from './Specialloadingbutton';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'lucide-react';
import { toast } from 'react-toastify';
import { addproject, clearallprojecterrror, getallproject, resetprojectslice } from '@/store/slices/projectslice';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


function AddProject() {

  const {loading,message,error,projects} = useSelector(state => state.project);

  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [projectBanner, setprojectBanner] = useState("")
  const [projectBannerpreview, setprojectBannerpreview] = useState("")
  const [gitrepolink, setgitrepolink] = useState("")
  const [projectLink, setprojectLink] = useState("")
  const [technologies, settechnologies] = useState("")
  const [stack, setstack] = useState("")
  const [deployed, setdeployed] = useState("")

  const dispatch = useDispatch();

  const handlesvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setprojectBanner(file);
      setprojectBannerpreview(reader.result);
    }
  }


  const handleaddproject  =(e) => {
     e.preventDefault();
     const formdata = new FormData();
     formdata.append("title" ,title);
     formdata.append("description" ,description);
     formdata.append("gitrepolink" ,gitrepolink);
     formdata.append("projectLink" ,projectLink);
     formdata.append("technologies" ,technologies);
     formdata.append("stack" ,stack);
     formdata.append("deployed" ,deployed);
     formdata.append("projectBanner" ,projectBanner);
     dispatch(addproject(formdata));
  }


  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearallprojecterrror());
    }
    if(message){
      toast.success(message);
      dispatch(resetprojectslice());
      dispatch(getallproject());
      settitle("")
      setdeployed("")
      setdescription("")
      settechnologies("")
      setgitrepolink("")
      setprojectLink("")
      setprojectBannerpreview("")
      setstack("")
    
    }
  } , [loading,message,error,dispatch])

  return (
    <>
      <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
      <form className='w-[100%] px-5 md:w-[1000px] ' onSubmit={handleaddproject}>
        <div className='space-y-12 '>
          <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center underline'>Add Projects</h2>
                <div className='mt-10 flex flex-col gap-5'>
                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Project</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <input type='text' placeholder='Name' value={title} onChange={(e) => settitle(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>

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
                    <Label className="block text-sm font-medium leading-6 text-gray-900">GITHUB LINK</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <input type='text' placeholder='LINK' value={gitrepolink} onChange={(e) => setgitrepolink(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>

                         </div>
                      </div>
                  </div>

                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Deployed LINK</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <input type='text' placeholder='LINK' value={projectLink} onChange={(e) => setprojectLink(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>

                         </div>
                      </div>
                  </div>
                  


                  <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Project Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {
                    projectBannerpreview ? <img className='mx-auto h-250px w-full text-gray-400' viewBox="0 0 24 24" src={projectBannerpreview ?  `${projectBannerpreview}` : ''} alt='svg'/> : <Image className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/> 
                  }
                
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id='file-upload' name='file-upload' type="file" className="sr-only" onChange={handlesvg}/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          
        


                  

                </div>
            </div> 

        </div>
        <div className='flex justify-center items-center'>

        
         {
          loading ? <Specialloadingbutton content={'Loading...'} width={"w-56"}/> : <Button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-56">Add Project</Button>
         }
         </div>

      </form>

    </div>
    </>
  )
}

export default AddProject
