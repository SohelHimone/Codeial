class chatEngine{
    constructor(chatboxid,useremail){
        this.chatbox=$(`#${chatboxid}`);
        this.useremail=useremail;
        this.socket=io.connect('http://localhost:5000');

        
        if(this.useremail){
            this.connecthandler();
           }
    }
       

       connecthandler(){
        self=this;
        this.socket.on('connect',function(){
            console.log('Connection Established using Socket');

            self.socket.emit('join_room',{
                user_email:self.useremail,
                chatroom:'codeial'
            })
            self.socket.on('user_joined',function(data){
                console.log('new user joined',data)
            })
        })

        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();
            console.log(msg)
            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.useremail,
                    chatroom:'codeial'
                });
            }
        });

         self.socket.on('receive_msg',function(data){
            console.log('new message recieved',data.mesaage);

            let newMessage=$('<li>');

            let messageType='other-message';

            if(data.user_email==self.useremail){
                messageType='self-message'
            }

            newMessage.append($('<span>',{
                'html':data.message
            }));

            newMessage.append($('<sub>',{
                'html':data.user_email
            }));

            newMessage.addClass(messageType);

            $("#chat-messages-list").append(newMessage);
         })
       }
    }
   

