import {Server} from 'socket.io'
import express  from "express";
import http, { createServer } from 'http'


const app = express()
const server =createServer(app);
const io=new Server(server,{
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

const userSocketMap={} 
 //to store the user socket and show who is online 
 export const getReciverSocketId=(reciverId) =>userSocketMap[reciverId]

io.on('connection',(socket)=>{
    const userID=socket.handshake.query.userID
    const username=socket.handshake.query.username
    if(userID){
        userSocketMap[userID] = socket.id
        console.log(`User ${userID} ${username} connected`)
    }
    io.emit("getOnLineUsers",Object.keys(userSocketMap))

    socket.on('disconnect',()=>{
        if(userID){

        delete userSocketMap[userID]
    }
    io.emit("getOnLineUsers",Object.keys(userSocketMap))

    }
)

})

export {app,server,io};
