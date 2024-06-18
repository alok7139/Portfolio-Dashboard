import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Specialloadingbutton from './Specialloadingbutton'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Image } from 'lucide-react'
import { addtool, clearalltoolerrror, getalltool, resettoolslice } from '@/store/slices/toolslice'

function AddTools() {
  const { loading,
    error,
    message,
    softwareapplication} = useSelector(state => state.tool);
  const dispatch = useDispatch();

  const [name, setname] = useState("")
  const [svg, setsvg] = useState("")
  const [svgpreview, setsvgpreview] = useState("")

  const handlesvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setsvg(file);
      setsvgpreview(reader.result);
    }
  }

  const handleaddtool = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name" , name);
    formdata.append("svg" , svg);
    dispatch(addtool(formdata));
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearalltoolerrror());
   
    }
    if(message){
      toast.success(message);
      dispatch(resettoolslice());
      dispatch(getalltool());
      
      setname("")
      setsvgpreview("");
    }
  } , [ dispatch , error , loading])



  useEffect(() => {

  } , [])
  return (
     <>
      <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
      <form className='w-[100%] px-5 md:w-[650px] ' onSubmit={handleaddtool}>
        <div className='space-y-12 '>
          <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center underline'>Add Software Tools</h2>
                <div className='mt-10 flex flex-col gap-5'>
                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Software Tool</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <input type='text' placeholder='Tool' value={name} onChange={(e) => setname(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>

                         </div>
                      </div>
                  </div>



                  <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Tool Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {
                    svgpreview ? <img className='mx-auto h-12 w-12 text-gray-400' viewBox="0 0 24 24" src={svgpreview ?  `${svgpreview}` : ''} alt='svg'/> : <Image className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/> 
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
          loading ? <Specialloadingbutton content={'Loading...'}/> : <Button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-56">Add Tool</Button>
         }
         </div>

      </form>

    </div>
     </>
  )
}

export default AddTools
