import React from "react";
import { useState, useEffect } from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/Card';
import styles from './review.module.css';

const Review = () => {

    const deckID = useParams();
    const[cardFront, setCardFront] = useState("");
    const[cardBack, setCardBack] = useState("");

    useEffect(() => {
        const getCardData = async() => {
            await axios.post("http://localhost:3001/card-data", {withCredentials: true, deckID: deckID.deckid})
                .then(() => {
                    dequeueCard();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getCardData();
    }, []);

    const dequeueCard = async() => {
        await axios.get("http://localhost:3001/card-data")
            .then((res) => {
                setCardFront(res.data.cardData.CardFront);
                setCardBack(res.data.cardData.CardBack);
            })
    }

    return(
        <>
            <NavigationBar />
            <div className={styles.cardContainer}>
                <Card className={styles.reviewCard}>
                    <Card.Body>
                        <Card.Title>{cardFront}</Card.Title>
                    </Card.Body>
                    <Button onClick={dequeueCard}>Next Card</Button>

                </Card>
            </div>

        </>
    )
}

export default Review;