import React from 'react'

const ChatBox = ({ user, message }) => {
  if (user) {
    return (
      
      <div className='max-w-[60%] bg-blue-50  rounded-b-xl rounded-tr-xl p-4 mb-6'>
        <h1 className='font-bold'>{user}</h1>
        <h1 className="md:text-md">{message}</h1>
        <p>{new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()}</p>
      </div>
    )
  } else {
    return (
      <div className='max-w-[60%] bg-blue-800 rounded-b-xl rounded-tl-xl mb-6 ml-auto text-white p-4'>
        <h1 className='font-bold'>You</h1>
        <h1>{message}</h1>
        <p>{new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()}</p>
      </div>
    )
  }



}

export default ChatBox

