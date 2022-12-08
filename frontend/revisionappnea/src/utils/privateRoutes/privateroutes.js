
import {Outlet, Navigate} from 'react-router-dom';
import { useState, useEffect} from 'react';
import React from 'react';
import axios from 'axios';

const PrivateRoutes = () =>{

    let[res, setRes] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get("http://localhost:3001/auth", {withCredentials: true});
            setRes(response.data.auth);
        }
        getData();
    },[])

    return(
         res ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;