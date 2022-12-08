import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"; 

export const logout = async () => {

    await axios.get("http://localhost:3001/logout", {
        withCredentials: true,
    }).then((res, err) => {
        if(res.data.loggedOut){
            localStorage.clear();
            window.location.reload(false);
        }
    })
}