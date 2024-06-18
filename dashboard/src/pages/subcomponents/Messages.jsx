
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Specialloadingbutton from './Specialloadingbutton';
import { clearallmessageerror, getallmessages, messagedelete, resetmessage } from '@/store/slices/messageslices';
import { toast } from 'react-toastify';

function Messages() {

 
  const {loading,
    message,
    error,
    messages} = useSelector(state => state.message)
  const dispatch = useDispatch();

  const [messageID, setmessageID] = useState("")

  const handlemessagedelete = (id) => {
   setmessageID(id);
   dispatch(messagedelete(id));
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearallmessageerror());
    }
    if(message){
      toast.success(message);
      dispatch(resetmessage());
      dispatch(getallmessages());
    }

  } , [dispatch , error , message , loading])
  


  return (
    <>
      <div className='min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20 sm:pr-20'>
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                 {
                  messages && messages.length > 0 ?  
                  (
                    messages.map((ele) => {
                      return (
                        <Card key={ele._id} className="grid gap-2 p-4">
                          <CardDescription className="text-slate-950">
                            <span className='font-bold mr-2'>Sender Name</span>
                             {ele.name}
                          </CardDescription>
                          <CardDescription className="text-slate-950">
                            <span className='font-bold mr-2'>Subject</span>
                             {ele.subject}
                          </CardDescription>
                          <CardDescription className="text-slate-950">
                            <span className='font-bold mr-2'>Message</span>
                             {ele.message}
                          </CardDescription>

                          <CardFooter className="justify-end mt-4">
                             {
                              loading && (messageID === ele._id) ? (<Specialloadingbutton width={"w-32"} content={'Loading...'}/>) : <Button className="w-32 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " onClick={() => handlemessagedelete(ele._id)}>Delete</Button>
                             }
                          </CardFooter>

                        </Card>
                      )
                    })
                  )
                  : <CardHeader>No Result Found!</CardHeader>
                 }
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </>
  )
}

export default Messages
