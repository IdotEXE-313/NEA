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
    const[revealBack, setRevealBack] = useState(false);
    const[visibilityReveal, setVisiblityReveal] = useState("");
    const[visibilityOptions, setVisibilityOptions] = useState("d-none");

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
                console.log(res);
                setCardFront(res.data.cardData.CardFront);
                setCardBack(res.data.cardData.CardBack);
            });
        setVisibilityOptions("d-none");
        setRevealBack(false);
        setVisiblityReveal("");
    }

    const handleClick = () => {
        setRevealBack(true);
        setVisiblityReveal("d-none");
        setVisibilityOptions("");
    }

    return(
        <>
            <NavigationBar />
            <div className={styles.cardContainer}>
                <Card className={styles.reviewCard}>
                    <Card.Body>
                        <Card.Title>{revealBack ? cardBack : cardFront}</Card.Title>
                    </Card.Body>
                    <Button onClick={handleClick} className={visibilityReveal}>Reveal Back</Button>
                    {/* <Button onClick={dequeueCard}>Next Card</Button> */}
                    {["Again", "Good", "Easy"].map((ease) => {
                        return(
                            <div className={styles.visibilityContainer}>
                                <div className={visibilityOptions}>
                                    <div className={styles.easeButtons}>
                                        <Button value={ease} onClick={dequeueCard}>{ease}</Button>
                                    </div>
                                </div>
                            </div>
                        )
            })}

                </Card>
            </div>

        </>
    )
}

export default Review;