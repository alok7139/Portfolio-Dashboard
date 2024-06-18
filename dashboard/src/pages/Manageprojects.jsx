import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { clearallprojecterrror, deleteproject, getallproject, resetprojectslice } from '@/store/slices/projectslice';
import { Eye, Pen, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Manageprojects() {

  const {loading,message,error ,projects } = useSelector(state => state.project)
  const dispatch = useDispatch();


  const handledeleteproject = (id) => {
    dispatch(deleteproject(id));
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearallprojecterrror());
    }
    if(message){
      toast.success(message);
      dispatch(resetprojectslice());
      dispatch(getallproject());
    }
  } , [dispatch,error,loading])


  return (
    <>
       <div className='flex min-h-screen w-full flex-col bg-muted/40'>
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>
                  Manage Your Projects
                </CardTitle>
                <Link to={'/'}>
                <Button>Dashboard</Button></Link>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                 <Table>
                  <TableHeader>
                  <TableRow>
                    <TableHead>Preview</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Stack</TableHead>
                    <TableHead>Deployed</TableHead>
                    <TableHead className="md:table-cell">Action</TableHead>
                  </TableRow>
                  </TableHeader>
                    <TableBody>
                    {
                     projects && projects.length > 0 ? (
                      projects.map((ele) => {
                        return (
                             <TableRow className="bg-accent" key={ele._id} >
                              <TableCell >
                                <div>
                                  <img src={ele.projectBanner && ele.projectBanner.url} alt={ele.title} className='w-16 h-16'/>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{ele.title}</TableCell>
                              <TableCell className="hidden md:table-cell">{ele.stack}</TableCell>
                              <TableCell className="hidden md:table-cell">{ele.deployed}</TableCell>
                              <TableCell className="flex flex-row items-center gap-3 h-24">
                                  
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/view/project/${ele._id}`}>
                                    <button  className="border-green-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-green-600 hover:text-slate-950 hover:bg-green-600">
                                     <Eye className='h-5 w-5'/>
                                </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom" >
                                    View
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/update/project/${ele._id}`}>
                                    <button  className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400 hover:text-slate-950 hover:bg-yellow-400">
                                     <Pen className='h-5 w-5'/>
                                </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom" >
                                    Edit
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                   
                                    <button onClick={() => handledeleteproject(ele._id)}  className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600">
                                     <Trash2 className='h-5 w-5'/>
                                </button>
                                 
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom" >
                                    Delete
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>


                              </TableCell>
                          
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
    
    </>
  )
}

export default Manageprojects
