
import {Outlet, Navigate} from 'react-router-dom';
import { useState, useEffect} from 'react';
import React from 'react';
import axios from 'axios';

const PrivateRoutes = () =>{

    const[res, setRes] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get("http://localhost:3001/auth", {withCredentials: true});
            setRes(response.data.auth); //returns isAuth which is either true or false
        }
        getData();
    },[])

    //if isAuth is true, proceed to the hidden route. If not, the user isn't logged in so proceed to /login
    return(
         res ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;