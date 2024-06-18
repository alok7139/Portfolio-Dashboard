import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs ,TabsContent} from '@/components/ui/tabs';
import { clearalltoolerrror, deletetool, getalltool, resettoolslice } from '@/store/slices/toolslice';



import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Specialloadingbutton from './Specialloadingbutton';

function Dashboard() {
 
  const {user} = useSelector(state => state.user)
  const {projects} = useSelector(state => state.project)
  const {skills } = useSelector(state => state.skill)
  const {softwareapplication , loading,error,message} = useSelector(state => state.tool)
  const {timeline} = useSelector(state => state.education)
  const dispatch = useDispatch();


  const [appid, setappid] = useState("")
  

  const handledeletetools = (id) => {
     setappid(id);
     dispatch(deletetool(id));
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
    }
  } , [dispatch,message,error,loading])

  // const aboutmelist = aboutMe.split(". ");


  return (
   <>
   <div className='flex flex-col sm:gap-4 sm:py-4
    sm:pl-14'>
    <main className='grid flex-1 items-start gap-4 sm:px-6 p-4 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2'>
    <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                {
                  user.aboutMe
                }
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-10">
              <Link to={user.portfolioURL && user.portfolioURL} target='_blank'>
              <Button >Visit Portfolio</Button>
              </Link>
               
            </CardFooter>

          </Card>

          <Card className="flex flex-col justify-center">
             <CardHeader className="pb-2">
                <CardTitle >Project Completed</CardTitle>
                <CardTitle className="text-6xl">{projects && projects.length}</CardTitle>
                
             </CardHeader>
             <CardFooter>
              <Link to={'/manage/projects'}>
              
             <Button >Manage Projects</Button>
             </Link>
             </CardFooter>
          </Card>

          <Card className="flex flex-col justify-center">
             <CardHeader className="pb-2">
                <CardTitle >Skills</CardTitle>
                <CardTitle className="text-6xl">{skills && skills.length}</CardTitle>
                
             </CardHeader>
             <CardFooter>
              <Link to={'/manage/skills'}>
              
             <Button >Manage Skills</Button>
             </Link>
             </CardFooter>
          </Card>
      </div>

      <Tabs>
        <TabsContent>
           <Card>
            <CardHeader className="px-7">
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>TItle</TableHead>
                    <TableHead className="hidden md:table-cell">Stack</TableHead>
                    <TableHead className="hidden md:table-cell">Deployed</TableHead>
                    <TableHead className="md:table-cell">Update</TableHead>
                    <TableHead className>Visit</TableHead>
                    
                  </TableRow>
                </TableHeader>
                   <TableBody>
                    {
                      projects && projects.length>0 ? (
                        projects.map((ele) => {
                          return (
                            <TableRow className="bg-accent" key={ele._id}>
                                <TableCell>
                                  <div className='font-semibold'>
                                    {ele.title}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{ele.stack}</TableCell>
                                <TableCell className="hidden md:table-cell">{ele.deployed}</TableCell>
                                <TableCell ><Link to={`/update/project/${ele._id}`}>
                                 <Button>Update</Button>
                                </Link></TableCell>
                                <TableCell ><Link to={ele.projectLink ? `${ele.projectLink}` : ""} target='_blank'>
                                 <Button>Visit</Button>
                                </Link></TableCell>
                            </TableRow>
                          )
                        })
                      ) : <TableRow>
                        <TableCell className="text-3xl overflow-y-hidden">
                          No Project
                        </TableCell>
                      </TableRow>
                    }
                   </TableBody>
              </Table>
            </CardContent>
           </Card>
        </TabsContent>
      </Tabs>

      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="px-7 gap-3">
                <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
                {
                  skills && skills.length>0 ? (
                    skills.map((ele) => {
                      return (
                        <Card key={ele._id}>
                          <CardHeader>
                            {ele.title}
                          </CardHeader>
                          <CardFooter>
                            <Progress value={ele.proficiency}/>
                          </CardFooter>

                        </Card>
                      )
                    })
                  ) : 

                  <p className="text-3xl overflow-y-hidden">
                          No Project
                        </p>
                }
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>


      <Tabs>
        <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="px-7">
              <CardTitle>Web Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Home</TableHead>
                    <TableHead className="md:table-cell">Icon</TableHead>
                    <TableHead className="md:table-cell">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    softwareapplication && softwareapplication.length > 0 ? (
                      softwareapplication.map((ele) => {
                        return (
                          <TableRow className="bg-accent" key={ele._id}>
                               <TableCell>{ele.name}</TableCell>
                               <TableCell><img src={ele.svg && ele.svg.url} alt={ele.name} className='w-7 h-7'/></TableCell>
                               <TableCell>
                                {
                                  loading && appid === ele._id ? <Specialloadingbutton content={"Loading..."} width={"w-fit"}/> : <Button onClick = {() => handledeletetools(ele._id)}>Delete</Button>
                                }
                               </TableCell>
                          </TableRow>
                        )
                      })
                    ) : 
                     <TableRow>
                        <TableCell className="text-3xl font-bold overflow-y-hidden"> 
                           Not added
                        </TableCell>

                     </TableRow>
                    
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-7 flex items-center justify-between flex-row">
                <CardTitle>Experience</CardTitle>
                <Link to={'/manage/timeline'}>
                <Button>Manage Experience</Button>
                </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                     timeline && timeline.length > 0 ? (
                      timeline.map((ele) => {
                        return (
                             <TableRow className="bg-accent" key={ele._id} >
                              <TableCell className="font-medium">{ele.title}</TableCell>
                              <TableCell className="md:table-cell">{ele.timeline.from}</TableCell>
                              <TableCell className="md:table-cell">{ele.timeline.to ? `${ele.timeline.to}` : "Present"}</TableCell>
                             </TableRow>
                        )
                      })
                     ) : <TableRow>
                        <TableCell className="text-3xl overflow-y-hidden font-bold">
                          Not Added
                        </TableCell>
                     </TableRow>
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </main>
   </div>



   
    
   </>
  )
}

export default Dashboard
