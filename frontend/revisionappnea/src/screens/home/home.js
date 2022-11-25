import React from "react";
import './home.css';
import NavigationBar from "../../components/navigation/navigationbar";

const Home = () => {

    const username = localStorage.getItem("Username");

    return(
        <>
            <NavigationBar />
             <div className="main-content-title">
                <h1>Hello {username}</h1>    
            </div>
        </>
    )
}

export default Home;