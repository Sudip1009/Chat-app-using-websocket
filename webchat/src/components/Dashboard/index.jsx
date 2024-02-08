import React, { useEffect, useState } from 'react'
import { FaRegUserCircle, FaSearch  } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import { FiFolderPlus } from "react-icons/fi";
import { user } from '../Form/join';

import ScrollToBottom from 'react-scroll-to-bottom';

import socketIo from 'socket.io-client'
import ChatBox from '../ChatBox/chat';
let socket;



const Dashboard = ({ inputData}) => {

 
 
  const[id , setId] = useState("")
  // const [currentMessage , setCurrentMessage] = useState("")
  const [messageList , setMessageList] = useState([])

  const sendMessage = async (e)=>{
    // if(currentMessage !== ""){
    //   const messageData ={
    //     userName : inputData,
    //     image: <FaRegUserCircle className='h-[40px] w-[42px]'/>,
    //     about: 'available',
    //     message : currentMessage,
    //     time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    //   }
    //    await socket.emit("send", { messageData }) 
    //    console.log(messageData) 
    // }
    const message = document.getElementById("message-input").value
    socket.emit("message", {message,id})
    document.getElementById("message-input").value =""
  }

  // useEffect(()=>{
  //     socket.on("received-message",(data)=>{
  //       console.log(data)
  //       setMessageList((list)=>[...list , data])
  //     })
  // },[socket])
  

  useEffect(() => {
    socket = socketIo("http://localhost:5174" ,{transports : ['websocket']})

    socket.on('connect',()=>{
      setId(socket.id)
    })

    socket.emit("new-user" ,{user})
    

    socket.on('welcome',(data)=>{
      setMessageList([...messageList , data])
      console.log(data.user, data.message)
    })
    socket.on('user-joined',(data)=>{
      setMessageList([...messageList , data])
      console.log(data.user, data.message,data.id)
    })

    // socket.on('leave',(data)=>{
    //   console.log(data.user, data.message)
    // })

  
    return () => {
      // socket.emit('disconnects')
      // socket.off()
    }
  }, [])

useEffect(() => {
  socket.on('send-message',(data)=>{
    setMessageList([...messageList , data])})

  return () => {
    
  }
}, [messageList])

  
  




  return (
    <div className='w-screen flex justify-center items-center'>
        {/* <div className='w-[25%] bg-white h-screen border '>
          <div className='flex justify-center items-center my-4'>
        <div className='border border-blue-600 p-[2px] md:p-[4px] rounded-full'><FaRegUserCircle className='h-[30px] w-[32px] sm:h-[40px] sm:w-[42px]' /></div>
            <div className='ml-2'>
                <h1 className='text-md md:text-2xl'>{inputData}</h1>
                <p className='md:text-lg font-light'>Available</p>
            </div>
            </div>
            <hr/>
            <div className='ml-10 mt-10'>
              <div className='text-blue-600 text-lg'>Peoples(3)</div>
              <div>
            
                      <div className='flex my-4 items-center'>
                      <div className='border border-blue-600 p-[4px] rounded-full'><FaRegUserCircle className='h-[40px] w-[42px]'/></div>
                          <div className='ml-2'>
                              <h1 className='text-lg'>userName</h1>
                              <p className='text-sm font-light text-gray-600'>Available</p>
                          </div>
                          </div>

                
              </div>
            </div>
        </div> */}
        <div className='md:w-[500px] h-[500px]'>
          <div className='w-full bg-blue-50 h-[70px] shadow-lg flex justify-between items-center px-4'>
           <div className='flex justify-center items-center'> 
            <div><FaRegUserCircle className='md:h-[40px] md:w-[45px]'/></div>
              <h1 className='ml-3 md:text-xl'>Discussion Panel</h1>
            </div>
            <div className='flex mr-4'>
              <FaSearch className='mr-4 md:size-6'/> 
              <CiMenuKebab className='md:size-6'/>
            </div>
          </div>

          <ScrollToBottom className='h-[75%] w-full overflow-scroll bg-slate-400'>
           <div className='p-14'>
  
         {messageList.map((item,i)=> <ChatBox key={item.user} user={item.id===id?'':item.user} message={item.message}/>)}
              </div>
              </ScrollToBottom>
          
          <div className='p-7 flex items-center bg-gray-400'>
            <input onKeyUpCapture={(e)=>e.key === 'Enter'? sendMessage():null} id="message-input" type="text" placeholder='Enter your message...' className='md:w-[75%] p-2 outline-none shadow-md rounded-full' />
            <BsSend onClick={sendMessage} className='h-[46px] bg-blue-800 text-white  w-[40px] p-2 ml-2 rounded-full cursor-pointer' />
            <FiFolderPlus className='h-[46px] bg-blue-800 text-white w-[40px] p-2 ml-2 rounded-full cursor-pointer'/>
          </div>
        </div>
    </div>
  )
}

export default Dashboard