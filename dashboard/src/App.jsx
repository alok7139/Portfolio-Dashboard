import React, { useEffect } from 'react'
import { Route,Routes } from 'react-router-dom' 
import { Slide, ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Resetpassword from './pages/Resetpassword';
import Manageprojects from './pages/Manageprojects';
import Manageskills from './pages/Manageskills';
import Managetimeline from './pages/Managetimeline';
import Viewproject from './pages/Viewproject';
import Updateproject from './pages/Updateproject';
import { useDispatch } from 'react-redux';
import { getuser } from './store/slices/userslice';
import { getallmessages } from './store/slices/messageslices';
import { getalleducation } from './store/slices/educationslice';
import { getallskill } from './store/slices/skillsslice';
import { getalltool } from './store/slices/toolslice';
import { getallproject } from './store/slices/projectslice';
// import './App.css'



function App() {
  // const notify = () => toast("Wow so easy!");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuser());
    dispatch(getallmessages());
    dispatch(getalleducation());
    dispatch(getallskill());
    dispatch(getalltool());
    dispatch(getallproject());
  } , []);

  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<Forgotpassword />} />
        <Route path="/password/reset/:token" element={<Resetpassword />} />
        <Route path="/manage/skills" element={<Manageskills />} />
        <Route path="/manage/timeline" element={<Managetimeline />} />
        <Route path="/manage/projects" element={<Manageprojects />} />
        <Route path="/view/project/:id" element={<Viewproject />} />
        <Route path="/update/project/:id" element={<Updateproject />} />
      </Routes>
      {/* <button onClick={notify}>Notify!</button> */}
      <ToastContainer position='top-center' transition={Slide} theme='dark' autoClose={5000}/>
    </>
  )
}

export default App
