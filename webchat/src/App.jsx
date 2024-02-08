import Form from './components/Form/join'
import Dashboard from './components/Dashboard/index'
import ChatBox from './components/ChatBox/chat'
// import {Routes ,Route, Navigate} from "react-router-dom"
import { useState } from "react"


// const ProtectedRoutes =({ children }) =>{
//   const isLoggedIn = localStorage.getItem('user:token') !== null || true;

  // if(!isLoggedIn){
  //   return <Navigate to='/'/>
  // }else if(isLoggedIn && ['/'].includes(window.location.pathname)){
  //   return <Navigate to='/welcome'/>
  // }
// }

import socketIo from 'socket.io-client'

const socket = socketIo("http://localhost:5174" ,{transports : ['websocket']})



function App() {

  const [inputData , setInputData] = useState("")
  const [showChat , setShowChat] = useState(false)

  return (
    <div className='bg-blue-200 h-screen flex justify-center items-center'>
      {!showChat ?(
     <Form inputData={inputData} setInputData={setInputData} setShowChat={setShowChat}/>):
     <Dashboard inputData={inputData}/>}
   {/* <Form/> */}
   {/* <Dashboard/> */}
   {/* <ChatBox/> */}
   </div>
  )
}

export default App
