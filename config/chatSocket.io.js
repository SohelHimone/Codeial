module.exports.chatSockets=function(socketServer){

    let io=require('socket.io')(socketServer,{cors:{origin:'http://localhost:4000',methods:['GET','POST']}})
    io.sockets.on('connection',function(socket){
        console.log('Connection received',socket.id);


       socket.on('disconnect',function(){
            console.log('disconnected');
        });
          
        socket.on('join_room',function(data){
            console.log('New user joined the room',data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        });


        socket.on('send_message',function(data){
           io.in(data.chatroom).emit('receive_msg',data)
        });
        
        });
        
    

}