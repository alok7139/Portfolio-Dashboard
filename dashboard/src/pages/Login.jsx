

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {clearAllusererrors, login } from "@/store/slices/userslice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Specialloadingbutton from "./subcomponents/Specialloadingbutton"


export default function Dashboard() {
  
 const [email, setemail] = useState("")
 const [password, setpassword] = useState("")

 const {loading , isauthenticated, error} = useSelector(state => state.user);


 const dispatch = useDispatch();
 const navigate = useNavigate();

 const handlelogin = () => {
  dispatch(login(email,password))
 }

 useEffect(() => {
  if(error){
    toast.error(error);
    dispatch(clearAllusererrors());
  }
  if(isauthenticated){
    navigate('/');
  }
 } , [dispatch , isauthenticated , error , loading])


  return (
    <div className="w-full  lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="flex min-h-[100vh] items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to={'/password/forgot'}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input  type="password" required  value = {password}
                onChange = {(e) => setpassword(e.target.value)}/>
            </div>
            {
              loading ? <Specialloadingbutton content={"Logging In"}/> : 
              <Button type="submit" className="w-full" onClick = {handlelogin}>
              Login
            </Button>
            }
            
            
          </div>
          
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-full bg-muted">
        <img
          src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
          alt="Image"
          className="w-full h-full "
        /> 
       </div>
    </div>
  )
}
