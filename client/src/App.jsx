import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { Routes , Route } from 'react-router-dom'
import Footer from './pages/Footer'
import Projectview from './pages/Projectview'
import Home from './pages/Home'
import { ModeToggle } from './components/mode-toggle'
import { ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from 'react-toastify'



function App() {
  

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <ModeToggle/> */}
         <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/project/:id' element={<Projectview/>}/>
         </Routes>
         <Footer/>
         <ToastContainer position='top-center' transition={Slide} theme='dark' autoClose={5000}/>
      </ThemeProvider>
    </>
  )
}

export default App
