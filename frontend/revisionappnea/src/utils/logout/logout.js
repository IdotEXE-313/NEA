import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"; 

export const logout = async () => {

    await axios.get("http://localhost:3001/logout", {
        withCredentials: true,
    }).then((res, err) => {
        if(err) throw new Error("Couldn't Logout")
        else{
            window.location.reload(false);
        }
    })
}