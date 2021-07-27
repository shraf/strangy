import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import SocketService from '../../classes/socketService';
import { Store } from '../../context/messagesStore';
import useDispatch from '../../context/useDispatch';
import useForm from '../../hooks/useForm';
import ChatLayout from './chatLayout';
const Chat = () => {

  const [state,dispatch]=useContext(Store);
  const {addMessage,clearMessages}=useDispatch(dispatch);
  const [socket, setSocket] = useState(null);
  const [isPaired, setIsPaired] = useState(false);
  const { name, room } = useParams();
  const [strangeName, setStrangeName] = useState("");
  const [display,setDisplay]=useState("invisible");
  var timer=setTimeout(()=>null,100);

  useEffect(() => {
    if (socket) {
      socket.listen("connect", () => {
        console.log("connected");
        console.log(socket.id);

        socket.send("join", { name, room });

      })

      socket.listen("paired_dissconnected", () => {
        console.log("dissconnected");
        initialize();
      })
      socket.listen("handshake", ({ participant }) => initializeWithPaiered(participant));
      socket.listen("message", (message) => recieveMessage(message));
      socket.listen("typing",()=>recieveTyping());

    }
    else
      setSocket(new SocketService());
    return () => socket ? socket.disconnect() : "";
  }, [socket])

 

  const doMessage=useCallback((message)=>{
    socket.send("message",message);
    addMessage({
      message:message,
      type:"sent"
    });
  },[socket]);

  const doType=useCallback((e)=>{
    socket.send("typing");
    
},[socket]);

const recieveTyping=()=>{
  setDisplay("visible");
    clearTimeout(timer);
  timer=(setTimeout(()=>setDisplay("invisible"),800));
  
}
  const initializeWithPaiered = (name) => {


    setIsPaired(true);
    setStrangeName(name);
  }

  const initialize = () => {
    setIsPaired(false);
    setStrangeName("");
  }

  const recieveMessage=(message)=>{
    addMessage({
      message:message,
      type:"recieved"
    })
  }
  return (
    <>
      {isPaired ? <ChatLayout display={display} doType={doType} messages={state.messages} name={strangeName} room={room} doMessage={doMessage}/> : <div className="text-white"> Waiting stranger to join room</div>}

    </>
  )
}
export default Chat;