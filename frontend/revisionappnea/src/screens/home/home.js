import React, { useEffect, useState } from "react";
import './home.css';
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";

const Home = () => {

    const username = localStorage.getItem("Username");
    const[userData, setUserData] = useState([]);

    useEffect(() => {
        const getUserData = async () => {
            await axios.post("http://localhost:3001/user-data",{
                withCredentials: true,
                username: username
            }).then((res) => {
                setUserData(res);
            })
            .catch((err) => {
                console.log(err)
            })
        }
        getUserData();
    }, [])

    return(
        <>
            <NavigationBar />
             <div className="main-content-title">
                <h1>Hello {username}</h1>    
            </div>
            <div>
                Other decks from {userData.data.schoolName[0][0].EstablishmentName}
            </div>
        </>
    )
}

export default Home;