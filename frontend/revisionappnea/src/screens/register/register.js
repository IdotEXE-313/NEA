import React from 'react';
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './register.css';

const Register = () => {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[school, setSchool] = useState("");
    const[data, setData] = useState([]);


    useEffect(() => {
        const getSchoolMatches = async () => {
            const response = await axios.post("http://localhost:3001/schools", {schoolName: school, withCredentials: true});
            if(response.data.schools[0].length <= 20) {
                setData(response.data.schools[0]);
            }
        }
        getSchoolMatches();
    }, [school]);

    const register = async (event) => {
        event.preventDefault();

        await axios.post("http://localhost:3001/register", {
            username: username,
            password: password,
            withCredentials: true
        });
    }

    return(
        <>
           <div className="form-styling">
            <Card style={{width: '25rem', padding: '1em'}} >
                <Card.Title style={{fontWeight: 'bold'}}>Register</Card.Title>
                <Card.Body>
                <Form action="/register" method="post" onSubmit={register}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlID="formBasicSchool">
                    <Form.Control type="search" placeholder="School Name" onChange={(e) => setSchool(e.target.value)}/>
                    <div className='mb-3'>
                        {data.map((data) => {
                            return( <a href="#" className='school-button' key={data.URN}>
                                {data.EstablishmentName}
                            </a>)
                        })}
                    </div>
                </Form.Group>
                <Button variant="primary" type="submit" className="submit-form-button">Register</Button>
                </Form>
                </Card.Body>
            </Card>
        </div>
        </>
    );
}

export default Register;