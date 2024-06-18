import React, { useState , useEffect } from 'react'
import Specialloadingbutton from './subcomponents/Specialloadingbutton'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  resetpassword } from '@/store/slices/forgotresetpasswordslice'
import { clearAllforgotpassworderrors } from '@/store/slices/forgotresetpasswordslice'
import { toast } from 'react-toastify'


function Resetpassword() {
  const [password, setpassword] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")
  const {token} = useParams();

  const {loading,error,message} = useSelector(state => state.forgotpassword)
  const dispatch = useDispatch();
  const {isauthenticated} = useSelector((state) => state.user)
  const navigate = useNavigate();


  const handleresetpassword = () => {
    dispatch(resetpassword(token,password,confirmpassword))
  }

  useEffect(() => {
    if(error){
     toast.error(error);
     dispatch(clearAllforgotpassworderrors())
    }
    if(isauthenticated){
     navigate('/');
    }
    if(message !== null){
     toast.success(message);
    }
 } , [dispatch,isauthenticated,error,loading])

  return (
    <>
     <div className="w-full  lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="flex min-h-[100vh] items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your new Password
            </p>
          </div>
          <div className="grid gap-4 m-5">
            <div className="grid gap-2">
              <Label >Password</Label>
              <Input
                type="password"
                required
                value = {password}
                onChange = {(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label >Confirm Password</Label>
              <Input
                type="password"
                required
                value = {confirmpassword}
                onChange = {(e) => setconfirmpassword(e.target.value)}
              />
            </div>
            
            {
              loading ? <Specialloadingbutton content={"Loading..."}/> : 
              <Button type="submit" className="w-full" onClick = {handleresetpassword}>
              Reset Password
            </Button>
            }
            
            
          </div>
          
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-full bg-muted">
        <img
          src="https://media.istockphoto.com/id/1306827906/vector/man-forgot-the-password-concept-of-forgotten-password-key-account-access-blocked-access.jpg?s=612x612&w=0&k=20&c=67nYr3ztbOn5uO6-mWBNCSw9mcHD9Z5M-QER-azGQ5w="
          alt="Image"
          className="w-full h-full "
        /> 
       </div>
    </div>
    </>
  )
}

export default Resetpassword
