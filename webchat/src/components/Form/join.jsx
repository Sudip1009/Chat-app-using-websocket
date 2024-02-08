import socketIo from 'socket.io-client'


let user;

const Form = ({ inputData , setInputData ,setShowChat}) => {

   const socket = socketIo("http://localhost:5174" ,{transports : ['websocket']})
  // const handleOnclick =()=>{
  //   console.log("welcome")   
  // }



  const onSubmit =(e)=>{
    e.preventDefault()
    user = document.getElementById("join-input").value
      if(inputData == undefined || inputData == ""){
        alert("enter your name to join")
      }else
      // socket.emit("new-user" , inputData)
      setShowChat(true)
  }



  return (
     <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl mb-5">Welcome to WebChat</h1>
    <div className="bg-white w-[300px] h-[120px] shadow-lg flex flex-col justify-center items-center">
        <h1 className="text-md mb-2">Enter your Name here to join</h1>
      <div className="p-2">
         <input id='join-input' onChange={(e)=> {setInputData(e.target.value)}}  className="border-[2px] border-blue-600" type="name" placeholder="Name" required /> 
        <button type="submit" onClick={onSubmit} className="bg-blue-200 ml-4 p-1 rounded-md w-[50px] hover:bg-blue-600 font-bold">Join</button>
        </div>
    </div>
    </div>
  )
}

export default Form
export {user}