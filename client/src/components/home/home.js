import React from 'react';
import { Container, Form,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  "./home.css";
import useForm from "../../hooks/useForm";
const Home=()=>{
    const {formData,handleInputChange}=useForm();
    return(
        <Container>
            <section className=" text-white" style={{opacity:0.8,fontFamily:"'Noto Sans HK', sans-serif",letterSpacing:"1px"}}>
                <h1>Free space....</h1>
                <h2>Anytime, any topic</h2>
            </section>
            <Form className="ml-auto mr-auto w-25 text-white my-5 ">
                <Form.Group>
                    <Form.Label className="float-left">Fake name</Form.Label>
                    <Form.Control value={formData.name||""} onChange={handleInputChange} className="bg-transparent" type="text" name="name" placeholder="mr.Anonymous "/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="float-left">Interested in</Form.Label>
                    <Form.Control value={formData.room||""} onChange={handleInputChange} className="bg-transparent" type="text" name="room" placeholder="tech,science,etc"/>
                </Form.Group>
                <Link className="butn rounded border-0 p-2 text-white" to={`/chat/${formData.name}/${formData.room}`} >Join Random chat</Link>
            </Form>
        </Container>
    )
}
export default Home;