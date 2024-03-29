import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form  from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import './login.css';

const Login = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[errMessage, setErrMessage] = useState("");
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault(); //prevents refreshing the page when submitted

        await axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
            withCredentials: true
        }).then((res) => {
            if(res.data.isLoggedIn){
                localStorage.setItem("Username", res.data.username);
                navigate("/home");
            }
            else{
                setErrMessage("Incorrect Credentials. Try Again");
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return(
        <>
           <div className="form-styling">
            <Card style={{width: '25rem', padding: '1em'}} >
                <Card.Title style={{fontWeight: 'bold'}}>Login</Card.Title>
                <Card.Body>
                <Form action="/register" method="post" onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className="submit-form-button">Login</Button>
                <div className="redirectRegister">
                    Not a user? <a href='/register'>Register</a>
                </div>
                <div>
                    {errMessage}
                </div>
                </Form>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default Login;