import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import styles from './review.module.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ReviewQueue = () => {

    const deckID = useParams();
    const[cardBack, setCardBack] = useState("");
    const[cardFront, setCardFront] = useState("");
    const[revealBack, setRevealBack] = useState(false);
    const[visibilityReveal, setVisiblityReveal] = useState("");
    const[visibilityOptions, setVisibilityOptions] = useState("d-none");


    useEffect(() => {
        const queueCards = async() => {
            await axios.post("http://localhost:3001/card-data-queue", {
                withCredentials: true,
                deckID: deckID.deckid
            })
            .then((res) => {
                dequeueCard();
            })
            .catch((err) => {
                console.log(err);
            })
        }
        queueCards();
    }, [])


    const dequeueCard = async () => {
        await axios.get("http://localhost:3001/card-data-queue")
            .then((res) => {
                console.log(res);
                setVisibilityOptions("d-none");
                setRevealBack(false);
                setVisiblityReveal("");
                if(res.data.cardData!== null){
                    setCardBack(res.data.cardData.value.CardBack);
                    setCardFront(res.data.cardData.value.CardFront);
                }
                else{
                    setCardFront("Queue Finished");
                    setVisiblityReveal("d-none");
                }
            })
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
                    {[0, 1, 2, 3, 4, 5].map((ease) => {
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

export default ReviewQueue;