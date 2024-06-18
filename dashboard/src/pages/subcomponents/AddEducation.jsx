import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import Specialloadingbutton from './Specialloadingbutton';
import { Button } from '@/components/ui/button';
import { useSelector , useDispatch } from 'react-redux';
import { clearalleducationerror, educationadd  , educationdelete , getalleducation, reseteducation} from '@/store/slices/educationslice';
import { toast } from 'react-toastify';

function AddEducation() {

  const [title, settitle] = useState("")
  const [description, setdescription] = useState("");
  const [from, setfrom] = useState("")
  const [to, setto] = useState("")

  const {loading, message,error,} = useSelector(state => state.education)
  const dispatch = useDispatch();

  const handleaddneweducation = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title" , title);
    formdata.append("description" , description);
    formdata.append("from" , from);
    formdata.append("to" , to);
    dispatch(educationadd(formdata));
  }

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch(clearalleducationerror());
    }
    if(message){
      toast.success(message);
      dispatch(reseteducation());
      dispatch(getalleducation());
      settitle("")
      setdescription("")
      setfrom("")
      setto("")
    }
  } , [dispatch , loading , message ,error])

  return (
    <>
    <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
      <form className='w-[100%] px-5 md:w-[650px] ' onSubmit={handleaddneweducation}>
        <div className='space-y-12 '>
          <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center underline'>Add Experience</h2>
                <div className='mt-10 flex flex-col gap-5'>
                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900"> TItle</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <input type='text' placeholder='Internship ,Higher Studies' value={title} onChange={(e) => settitle(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>

                         </div>
                      </div>
                  </div>
                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900"> Description</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <input type='text' placeholder='Description' value={description} onChange={(e) => setdescription(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>

                         </div>
                      </div>
                  </div>
                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Start</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <input type='number' placeholder='Start' value={from} onChange={(e) => setfrom(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>

                         </div>
                      </div>
                  </div>
                  <div className='w-full sm:col-span-4'>
                    <Label className="block text-sm font-medium leading-6 text-gray-900"> To</Label>
                      <div className='mt-2'>
                         <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                          <input type='number' placeholder='to' value={to} onChange={(e) => setto(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>

                         </div>
                      </div>
                  </div>

                </div>
            </div> 

        </div>
        <div className='flex justify-center items-center'>

        
         {
          loading ? <Specialloadingbutton content={'Loading...'}/> : <Button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-56">Add Education</Button>
         }
         </div>

      </form>

    </div>

    </>
  )
}

export default AddEducation
