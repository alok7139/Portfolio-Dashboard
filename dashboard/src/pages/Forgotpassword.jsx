import { forgotpassword } from '@/store/slices/forgotresetpasswordslice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAllforgotpassworderrors } from '@/store/slices/forgotresetpasswordslice';
import Specialloadingbutton from './subcomponents/Specialloadingbutton';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function Forgotpassword() {

  const [email, setemail] = useState("")
  const {loading,error,message} = useSelector(state => state.forgotpassword)
  const dispatch = useDispatch();
  const {isauthenticated} = useSelector((state) => state.user)
  const navigate = useNavigate();

  const handleforgotpassword = () => {
    dispatch(forgotpassword(email));
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
   setemail("");
} , [dispatch,isauthenticated,error,loading])

  return (
    <>
       <div className="w-full  lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="flex min-h-[100vh] items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to reset your password
            </p>
          </div>
          <div className="grid gap-4 m-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                required
                value = {email}
                onChange = {(e) => setemail(e.target.value)}
              />
            </div>
            {/* <div className="grid gap-2">
              <div className="flex items-center">
                
                <Link
                  to={'/password/forgot'}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              
            </div> */}
            {
              loading ? <Specialloadingbutton content={"Loading..."}/> : 
              <Button type="submit" className="w-full" onClick = {handleforgotpassword}>
              Forget Password
            </Button>
            }
            
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            {/* Don&apos;t have an account?{" "} */}
            <Link to={'/login'} className="underline">
              Remember Password?
            </Link>
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

export default Forgotpassword
