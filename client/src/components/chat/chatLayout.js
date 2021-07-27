import React,{useCallback, useEffect, useRef,useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import "./chat.css";
import { FiSend } from "react-icons/fi";
import { FaRegHandPeace } from "react-icons/fa";
import {GrEmoji} from "react-icons/gr";
import Picker from 'emoji-picker-react';
import useForm from '../../hooks/useForm';

const ChatLayout = ({ name, room, doMessage, messages, display,  doType }) => {
    const {formData,handleInputChange}=useForm();
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [showEmoji,setShowEmoji]=useState("d-none");
    const listElement=useRef();
    const onEmojiClick = useCallback((event, emojiObject) => {
        handleInputChange({target:{name:"msg",value:formData.msg+emojiObject.emoji}});
        console.log(emojiObject);
      },[formData]);
    const sendTyping=(e)=>{
        handleInputChange(e);
        doType();
    }

    const dropEmojiMenu=(e)=>{
        e.preventDefault();
        setShowEmoji(showEmoji=="d-none"?"d-inline":"d-none" );
    }
    
    
    const sendMessage = (e) => {
        e.preventDefault();   
        doMessage(formData.msg);
        formData.msg = "";
    }


    useEffect(()=>{
        const list=listElement.current;
        list.children[list.children.length-1].scrollIntoView(true);
    },[messages])
    return (
        <Row className="text-white h-90vh">
            <Col xs={12} md={4}>
                <div className="">
                    <h2>{room}</h2>
                    <h3>{name}</h3>
                </div>
            </Col>
            <Col xs={12} md={8}>
                <div className="layout vh-100 ">
                    <h2>Say something <FaRegHandPeace color="orange" /></h2>
                    <div className=" h-50">
                        <ul className="messages" ref={listElement}>
                            {messages.map((message, index) => <li key={index} className={`message message-${message.type}`}>{message.message}</li>)}
                            <span className={`mr-auto text-muted ${display}`}>Typing...</span>
                        </ul>
                    </div>
                    <form className="d-flex mh-25 ">
                        <textarea onKeyDown={(e)=>{if(e.key==="Enter"&&!e.shiftKey)sendMessage(e);}}   name="msg" className="input h-75" type="text" value={formData.msg || ""} onChange={sendTyping} />

                        <button className="btn-icon" onClick={sendMessage}><FiSend size={20} /></button>
                        <button onClick={dropEmojiMenu} className="btn-icon"> <GrEmoji/> </button>
                        
                    </form>
                    <div className={`${showEmoji} float-right mt-2`}>
                        <Picker  onEmojiClick={onEmojiClick} />

</div>
                </div>
            </Col>
        </Row>
    )
}
export default ChatLayout;