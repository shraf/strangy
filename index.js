const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const redis = require("redis");
const util = require('util')
const path = require('path');

const rooms = {};
const users = {};

const app = express();
app.use(cors);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
const server = app.listen(5000);

/* const callback=()=>{
    if (rooms[room]) {
        let freeUsersNumbers = rooms[room].freeUsers.length
        if (freeUsersNumbers > 0) {
            let randomUserINdex = Math.floor(Math.random() * freeUsersNumbers);
            let paired_user = rooms[room].freeUsers[randomUserINdex];
            socket.broadcast.to(paired_user).emit('handshake', 'for your eyes only'); 
       
        }
        else {
            rooms[room].freeUsers = [socket.id];
        }
    }
    else {
        rooms[room] = { freeUsers: [socket.id] };
    }
} */
const pairUser = (id, room) => {
    let freeUsersNumbers = rooms[room].free.length;
    let randomUserIndex = Math.floor(Math.random());
    let paired_user = rooms[room].free[randomUserIndex];
    rooms[room].paired = { ...rooms[room].paired, [id]: paired_user, [paired_user]: id };
    rooms[room].free = rooms[room].free.filter(user => user != paired_user);
    return new Promise((resolve, reject) => resolve(paired_user));
}
const io = socketIO(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", socket => {
    console.log("new user connected");
    socket.on("join", ({ room, name }) => {
        socket.join(room)
        users[socket.id]={...users[socket.id],name:name};
    });

    socket.on("message", (message) => {
        const {room} = users[socket.id];
        const paired_user = rooms[room].paired[socket.id];
        socket.broadcast.to(paired_user).emit("message", message);
        console.log("messaging");
        console.log(`from ${socket.id} to ${paired_user}`)
    })
    socket.on('disconnect', () => {

        const room = users[socket.id].room;
        const pairedUser=rooms[room].paired[socket.id];
        console.log(pairedUser);
        console.log("deleting room");
        delete users[socket.id]
        if (room&&rooms[room]){
            delete rooms[room].paired[socket.id];
            delete rooms[room].paired[pairedUser];
            rooms[room].free.push(pairedUser);
            console.log("deleted room");
        }
        socket.broadcast.to(pairedUser).emit("paired_dissconnected");
    });
  
    
    socket.on("typing",()=>{
        const room = users[socket.id].room;
        const pairedUser=rooms[room].paired[socket.id];
        socket.broadcast.to(pairedUser).emit("typing");
    })
})
io.of("/").adapter.on("create-room", (room) => {
    rooms[room] = { free: [], paired: {} };
});

io.of("/").adapter.on("join-room", (room, id) => {
    if (room != id) {
        console.log("room != id");
        users[id] = {...users[id],room:room};
        if (rooms[room].free.length > 0)
            pairUser(id, room)
                .then(paired_user =>{
                     io.sockets.sockets.get(id).broadcast.to(paired_user).emit("handshake",{participant:users[id].name});
                     io.sockets.sockets.get(paired_user).broadcast.to(id).emit("handshake",{participant:users[paired_user].name});
                    
                    })
        else {
            rooms[room].free.push(id);
        }
    }
});

