import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConversationImage from "../../assets/conversation.svg";
import  "./about.css";
const About=()=>(
    <Container className="text-white ">
    <Row>
      
    <Col>
    <div className="text-justify">
        <h2>What is Strangy?</h2>
        <p>Strangy is a Random-anonymous-chat application</p>
        <p>you can easily speak freely with a random user about any topic you want </p>
        <p>and of course , every thing here is <strong>anonymous</strong></p>
        <ul>
            <li>First,go to <Link className="" to="/home">Main</Link> page.</li>
            <li>Then enter  a fakename(aka:nickname).</li>
            <li>After that,Enter a topic you want to speak about.</li>
            <li>at the end, speak freely without any society restriction , no one knows you.</li>
        </ul>
        </div>
        </Col>
        <Col xs={12} md={4}>
    <img className="animated-icon" src={ConversationImage}/>
    </Col>
        </Row>
    </Container>
)
export default About;