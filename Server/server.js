
//  const users ={}
// io.on('connection', socket =>{
//     socket.on('new-user-joined' , name=>{
//         console.log('new user', name)
//         users[socket.id] = name
//         socket.broadcast.emit('user-joined' , name)
//     })

//     socket.on('send' , message=>{
//         socket.broadcast.emit('receive' , {message: message , name: users[socket.id]})
//     })
// })



// const express = require("express")
// const app = express()
// const http = require("http")
// const cors = require("cors")
// const { Server } = require("socket.io")
// app.use(cors());

// const server = http.createServer(app)

// const io = new Server(server , {
//     cors: {
//         origin:" http://localhost:5173",
//         methods: ["GET","POST"],
//     },
// })

// app.get("/", (req, res)=>{
//     res.send("hello")
// })

// const users ={}

// io.on('connection', socket =>{
//     socket.on("new-user" , data =>{
//         users[socket.id] = data
//         socket.join(data)
//         socket.broadcast.emit('user-joined' , data)
//     })

//     // socket.on("user-joined", data =>{
//     //     socket.emit(data)
//     // })

//     socket.on('send' , message=>{
//       socket.emit("received-message" , {message: message , data: users[socket.id]})  //.to(socket.id) use for specific group
//     })
// })

// server.listen(5174, ()=>{
//     console.log("server running")
// })

const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const socketIO = require("socket.io")
app.use(cors());

const port =5174

app.get("/", (req, res)=>{
    res.send("hello")
})


const server = http.createServer(app)

const io = socketIO(server)

const users =[{}]

io.on('connection', socket =>{
    socket.on("new-user" , ({user}) =>{
        users[socket.id] = user
        // console.log(user)
        socket.emit('welcome',{user:"admin" , message:`welcome to the chat,${users[socket.id]}`})
        socket.broadcast.emit('user-joined',{user:"admin", message:`${users[socket.id]} has joind`,id:socket.id})
        // socket.broadcast.emit('user-joined' , data)
    })

    socket.on('message',({message , id})=>{
        io.emit('send-message',{user:users[id],message,id})
    })

    // socket.on('disconnects',()=>{
    //     socket.broadcast.emit('leave',{user:"admin" , message:`${users[socket.id]} leave the chat`})
    // })

})





server.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
})