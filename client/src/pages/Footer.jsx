import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitterSquare } from "react-icons/fa";



function Footer() {
  return (
  //  <>
  //   <footer className="p-5 mt-6 w-full max-w-[1050px] mx-auto">
  //    <hr />
  //    <h1 className="text-tubeLight-effect text-3xl mt-5 justify-center sm:justify-start tracking-[8px]">Thanks For Scrolling</h1>
  //   </footer>
  //  </>



  <>
     

<footer class="bg-white dark:bg-gray-900 mt-14">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
              {/* <a href="https://flowbite.com/" class="flex items-center"> */}
                  {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" /> */}
                  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Alok's Portfolio</span>
              {/* </a> */}
          </div>
          <div class="grid grid-cols-1 gap-7 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contact</h2>
                  <div class="text-gray-500 dark:text-gray-400 font-medium flex flex-col">
                      <div class="mb-4 flex flex-row gap-2">
                      <MdEmail />
                      <p className='mb-1'> alokgarg7139@gmail.com</p>
                          
                      </div>
                      <div className='mb-4 flex flex-row gap-2'>
                      <FaPhoneAlt/>
                      <p >+91 8126936403</p>
                      </div>
                  </div>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <Link to="https://github.com/alok7139" class="hover:underline " target='_blank'>Github</Link>
                      </li>
                      <li>
                          <Link to="https://www.linkedin.com/in/alok-garg-7118b6257/" class="hover:underline" target='_blank'>Linkdin</Link>
                      </li>
                  </ul>
              </div>
              {/* <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <Link to="/" class="hover:underline">Privacy Policy</Link>
                      </li>
                      <li>
                          <Link to="/" class="hover:underline">Terms &amp; Conditions</Link>
                      </li>
                  </ul>
              </div> */}
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link to='/' class="hover:underline">Alok™</Link>. All Rights Reserved.
          </span>
          <div class="flex mt-4 sm:justify-center gap-4 sm:mt-0">
              
              

              <Link to={'https://github.com/alok7139'} target='_blank'><FaGithub className='h-5 w-5'/></Link>
              <Link to={'https://www.linkedin.com/in/alok-garg-7118b6257/'} target='_blank'><FaLinkedin className='h-5 w-5'/></Link>
              <Link to={'https://www.instagram.com/_garg_alok_/?hl=en'} target='_blank'><AiFillInstagram className='h-5 w-5'/></Link>
              <Link to={'https://x.com/AlokGar76235535'} target='_blank'><FaTwitterSquare className='h-5 w-5'/></Link>
              
          </div>
      </div>
    </div>
</footer>

  </>
  )
}

export default Footer
