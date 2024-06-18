import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { clearallskillerrror, deleteskill, getallskill, resetskillslice, updateskill } from '@/store/slices/skillsslice';
import { Trash2 } from 'lucide-react';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Manageskills() {


  const {loading,error,message,skills} = useSelector(state => state.skill)
  const dispatch = useDispatch();


  const [newproficiency, setnewproficiency] = useState(1)

  const handleinputchange = (proficiency) => {
       setnewproficiency(proficiency);
  }


  const handleupdateskill = (id) => {
    dispatch(updateskill(id,newproficiency))
  }

  const handledeleteskill = (id) => {
    dispatch(deleteskill(id));
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearallskillerrror());
    }
    if(message){
      toast.success(message);
      dispatch(resetskillslice());
      dispatch(getallskill());
    }
  } , [dispatch,error,loading])

  return (
      <>
          <div className='flex min-h-screen w-full flex-col bg-muted/40'>
          <Tabs>
            
            <TabsContent>
              <Card>
                <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                   <CardTitle>Manage Your Skills</CardTitle>
                   <Link to={'/'}>
                   <Button className="w-fit">Dashboard</Button>
                   </Link>
                   
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  {
                    skills && skills.length >0 ? (
                      skills.map((ele) => {
                        return (
                          <Card key={ele._id}>
                            <CardHeader className="text-3xl font-bold items-center justify-between flex-row">
                              {ele.title}
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Trash2 onClick={() => handledeleteskill(ele._id)} className='h-5 w-5 hover:text-red-600'/>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" style={{color:"red"}}>
                                    Delete
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </CardHeader>
                            <CardFooter>
                              <Label className="text-2xl mr-2 ">Proficiency</Label>
                              <Input type="number" defaultValue={ele.proficiency}  onChange={(e) => handleinputchange(e.target.value)} onBlur={() => handleupdateskill(ele._id)}/>
                            </CardFooter>

                          </Card>
                        )
                      })
                    ) :<CardTitle className="text-3xl overflow-y-hidden font-bold">Not Added</CardTitle>
                  }
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
            
          </div>
      </>
  )
}

export default Manageskills
