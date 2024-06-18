import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Specialloadingbutton from './Specialloadingbutton';
import { clearAllusererrors, getuser, resetprofile, updateprofile } from '@/store/slices/userslice';
import { toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';

function UpdateProfile() {
  const  {user, loading,error,isUpdated , message} = useSelector(state => state.user)

  const [fullname, setfullname] = useState(user && user.fullname);
  const [email, setemail] = useState(user && user.email)
  const [phone, setphone] = useState(user && user.phone)
  const [aboutMe, setaboutMe] = useState(user && user.aboutMe)
  const [portfolioURL, setportfolioURL] = useState(user && user.portfolioURL)
  const [resumeURL, setresumeURL] = useState(user && user.resumeURL)
  const [githubURL, setgithubURL] = useState(user && (user.githubURL === "undefined" ? "" : user.githubURL))
  const [linkdinURL, setlinkdinURL] = useState(user && (user.linkdinURL === "undefined" ? "" : user.linkdinURL))
  const [leetcodeURL, setleetcodeURL] = useState(user && (user.leetcodeURL === "undefined" ? "" : user.leetcodeURL))
  const [instagramURL, setinstagramURL] = useState(user && (user.instagramURL === "undefined" ? "" : user.instagramURL))
  const [avatar, setavatar] = useState(user && user.avatar && user.avatar.url)
  const [avatarpreview, setavatarpreview] = useState(user && user.avatar && user.avatar.url)
  const [resume, setresume] = useState(user && user.resume && user.resume.url)
  const [resumepreview, setresumepreview] = useState(user && user.resume && user.resume.url)


  const dispatch = useDispatch();

  const avatarhandle = (e) => {
     const file = e.target.files[0];
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => {
      setavatarpreview(reader.result)
      setavatar(file);
     } 
  }

  const resumehandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
     setresumepreview(reader.result)
     setresume(file);  
    } 
 }

 const handleupdateprofile = () => {
  const formdata = new FormData();
  formdata.append("fullname" , fullname);
  formdata.append("email" , email);
  formdata.append("phone" , phone);
  formdata.append("aboutMe" , aboutMe);
  formdata.append("portfolioURL" , portfolioURL);
  formdata.append("resumeURL" , resumeURL);
  formdata.append("githubURL" , githubURL);
  formdata.append("instagramURL" , instagramURL);
  formdata.append("linkdinURL" , linkdinURL);
  formdata.append("leetcodeURL" , leetcodeURL);
  formdata.append("avatar" , avatar);
  formdata.append("resume" , resume);
  dispatch(updateprofile(formdata));
  
 }

 

 useEffect(() => {
     if(error){
      toast.error(error);
      dispatch(clearAllusererrors());
     }
     if(isUpdated){
      dispatch(getuser());
      dispatch(resetprofile());
     }
     if(message){
      toast.success(message);
      
     }
 } , [dispatch , loading , error , isUpdated])


  return (
    <>
      <div className='w-full h-full'>
          <div>
            <div className='grid w-[100%] gap-6'>
              <div className='grid gap-2'>
                <h1 className='text-3xl font-bold '>Update Profile</h1>
                {/* <h2 className='mb-5'>Update Your Profile</h2> */}

              </div>

            </div>
            <div className='grid gap-6 mt-8'>
              <div className='flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5'>
                 <div className='grid gap-2 w-full sm:w-72 '>
                  <Label>Profile</Label>
                  <img src={avatarpreview ? avatarpreview : 'https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small/profile-icon-login-head-icon-vector.jpg'}
                  alt='avatar'
                  className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'
                  />
                  <div className='relative'>
                 <Input type='file' className='avatar-update-btn'  onChange={avatarhandle}/>
                     
                  </div>
          

                 </div>

                 <div className='grid gap-2 w-full sm:w-72 '>
                  <Label>Resume</Label>
                  <Link to={user && user.resume && user.resume.url} target='_blank'>
                  <img src={resumepreview ? resumepreview : 'https://cdn.enhancv.com/single_column_resume_template_2_120817dd43.png'}
                  alt='resume'
                  className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'
                  />
                  </Link>
                  

                  <div className='relative'>
                 <Input type='file' className='avatar-update-btn'   onChange={resumehandle}/>
                     
                  </div>

                  

                 </div>
              </div>

              <div className='grid gap-2'>
                <Label>Full Name</Label>
                <Input type="text" placeholder='Enter your name' value={fullname} onChange={(e) => setfullname(e.target.value)}/>
              </div>
              <div className='grid gap-2'>
                <Label>Email</Label>
                <Input type="email" placeholder='Enter your email' value={email} onChange={(e) => setemail(e.target.value)}/>
              </div>
              <div className='grid gap-2'>
                <Label>Phone</Label>
                <Input type="text" placeholder='Enter your Phone' value={phone} onChange={(e) => setphone(e.target.value)}/>
              </div>
              <div className='grid gap-2'>
                <Label>About Me</Label>
                <Textarea placeholder='About Me' value={aboutMe} onChange={(e) => setaboutMe(e.target.value)}/>
              </div>
              <div className='grid gap-2'>
                <Label>Portfolio URL</Label>
                <Input placeholder='Portfolio URL' value={portfolioURL} onChange={(e) => setportfolioURL(e.target.value)}/>
              </div>

              <div className='grid gap-2'>
                <Label>Resume URL</Label>
                <Input placeholder='Resume URL' value={resumeURL} onChange={(e) => setresumeURL(e.target.value)}/>
              </div>
              <div className='grid gap-2'>
                <Label>Github URL</Label>
                <Input value={githubURL} placeholder='Github URL' onChange={(e) => setgithubURL(e.target.value)}/>
              </div>
              <div className='grid gap-2'>
                <Label>Instagram URL</Label>
                <Input placeholder='Instagram URL'  value={instagramURL} onChange={(e) => setinstagramURL(e.target.value)}/>
              </div>
              <div className='grid gap-2'>
                <Label>Linkdin URL</Label>
                <Input placeholder='Linkdin URL' value={linkdinURL} onChange={(e) => setlinkdinURL(e.target.value)}/>
              </div>
              <div className='grid gap-2'>
                <Label>LeetCode URL</Label>
                <Input placeholder='Leetcode URL' value={leetcodeURL} onChange={(e) => setleetcodeURL(e.target.value)}/>
              </div>

              <div className='flex justify-center items-center gap-2 '>
                {
                  !loading ? <Button  className=' rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-56' onClick={  handleupdateprofile}>Update</Button> : <Specialloadingbutton content={'Loading...'}/>
                }

              </div>
             
              

            </div>
          </div>
        </div>
    </>
  )
}

export default UpdateProfile
