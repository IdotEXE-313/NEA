import React from "react";
import { useState, useEffect } from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Review = () => {

    const deckID = useParams();

    useEffect(() => {
        const getCardData = async() => {
            await axios.post("http://localhost:3001/card-data", {withCredentials: true, deckID: deckID.deckid})
                .then((res) => {
                    console.log(res.data);
                })
        }
        getCardData();
    }, [])

    return(
        <>
            <NavigationBar />

        </>
    )
}

export default Review;