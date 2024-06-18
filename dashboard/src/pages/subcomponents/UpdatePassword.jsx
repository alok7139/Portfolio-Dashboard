import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useEffect, useState } from 'react'
import Specialloadingbutton from './Specialloadingbutton'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllusererrors, resetprofile, updatepassword } from '@/store/slices/userslice'
import { toast } from 'react-toastify'

function UpdatePassword() {
  

  const [currentpassword, setcurrentpassword] = useState("")
  const [newpassword, setnewpassword] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")

  const dispatch = useDispatch();
  const { loading,error,isUpdated , message} = useSelector(state => state.user)


  const handleupdatepassword = () => {
     dispatch(updatepassword(currentpassword,newpassword,confirmpassword));
     setconfirmpassword("")
     setcurrentpassword("")
     setnewpassword("");
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAllusererrors());
    }
    if(isUpdated){
      dispatch(resetprofile());
    }
    if(message){
      toast.success(message);
    }
   
  })

  return (
    <>
     <div className='w-full h-full'>
          <div>
            <div className='grid w-[100%] gap-6'>
              <div className='grid gap-2'>
                <h1 className='text-3xl font-bold '>Update Password</h1>
                {/* <h2 className='mb-5'>Update Your Profile</h2> */}

              </div>

            </div>
            <div className='grid gap-6 mt-8'>
             

              <div className='grid gap-2'>
                <Label>Current Password</Label>
                <Input type="text" placeholder='Current Password' value={currentpassword} onChange={(e) => setcurrentpassword(e.target.value)}/>
              </div>
              <div className='grid gap-2'>
                <Label>New Password</Label>
                <Input type="text" placeholder=' New Password' value={newpassword} onChange={(e) => setnewpassword(e.target.value)}/>
              </div>
              <div className='grid gap-2'>
                <Label>Confirm Password</Label>
                <Input type="text" placeholder=' Confirm Password' value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)}/>
              </div>
             

              <div className='flex justify-center items-center gap-2'>
                {
                  !loading ? <Button  className=' rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-56' onClick={  handleupdatepassword}>Update</Button> : <Specialloadingbutton content={'Loading...'}/>
                }

              </div>
             
              

            </div>
          </div>
        </div>
    </>
  )
}

export default UpdatePassword
