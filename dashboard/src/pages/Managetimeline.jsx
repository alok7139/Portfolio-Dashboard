import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs } from '@/components/ui/tabs'
import { clearalleducationerror, educationdelete, getalleducation, reseteducation } from '@/store/slices/educationslice'
import { TabsContent } from '@radix-ui/react-tabs'
import { Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'


function Managetimeline() {

  const {loading,message,error,timeline} = useSelector(state => state.education)
  const dispatch = useDispatch()

 


  const handleeducation = (id) => {
   
    dispatch(educationdelete(id));
  }

  useEffect(() => {
      if(error){
        toast.error(error);
        dispatch(clearalleducationerror());
      }
      if(message){
        toast.success(message);
        dispatch(reseteducation());
        dispatch(getalleducation());
      }
  } , [dispatch,loading,error,message])



  return (
    <>
     <div className='flex min-h-screen w-full flex-col bg-muted/40'>
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>
                  Manage Your Experience
                </CardTitle>
                <Link to={'/'}>
                <Button>Dashboard</Button></Link>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                 <Table>
                  <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                  </TableHeader>
                    <TableBody>
                    {
                     timeline && timeline.length > 0 ? (
                      timeline.map((ele) => {
                        return (
                             <TableRow className="bg-accent" key={ele._id} >
                              <TableCell className="font-medium">{ele.title}</TableCell>
                              <TableCell className="md:table-cell">{ele.description}</TableCell>
                              <TableCell className="md:table-cell">{ele.timeline.from}</TableCell>
                              <TableCell className="md:table-cell">{ele.timeline.to ? `${ele.timeline.to}` : "Present"}</TableCell>

                              <TableCell className="flex justify-end"><button onClick={() => handleeducation(ele._id)} className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600">
                                  <Trash2 className='h-5 w-5'/>
                                </button></TableCell>
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

export default Managetimeline
