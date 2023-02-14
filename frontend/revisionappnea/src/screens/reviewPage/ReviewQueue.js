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
    const[priority, setPriority] = useState(0);
    const[cardID, setCardID] = useState("");


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


    const dequeueCard = async (newPriority) => {
        await axios.get("http://localhost:3001/card-data-queue")
            .then((res) => {
                console.log(res);
                setVisibilityOptions("d-none");
                setRevealBack(false);
                setVisiblityReveal("");
                if(res.data.cardData!== null){
                    setCardBack(res.data.cardData.value.CardBack);
                    setCardFront(res.data.cardData.value.CardFront);
                    setCardID(res.data.cardData.value.CardID);
                    setPriority(res.data.cardData.value.Priority);
                }
                else{
                    setCardFront("Queue Finished");
                    setVisiblityReveal("d-none");
                }
            })
        
        await axios.post("http://localhost:3001/update-card-priority", {
                withCredentials: true,
                priority: newPriority,
                deckID: deckID.deckid,
                cardID: cardID
            });
    }

    const handleClick = () => {
        setRevealBack(true);
        setVisiblityReveal("d-none");
        setVisibilityOptions("");
    }

    return(
        <>
            <NavigationBar />
            <div className={styles.priorityDiv}>
                Priority: {priority}
            </div>
            <div className={styles.cardContainer}>
                <Card className={styles.reviewCard}>
                    <Card.Body>
                        <Card.Title>{revealBack ? cardBack : cardFront}</Card.Title>
                    </Card.Body>
                    <Button onClick={handleClick} className={visibilityReveal}>Reveal Back</Button>
                    {["Easy", "Good", "Challenging", "Hard"].map((ease, index) => {
                        return(
                            <div className={styles.visibilityContainer}>
                                <div className={visibilityOptions}>
                                    <div className={styles.easeButtons}>
                                        <Button value={index} onClick={(e) => dequeueCard(e.target.value)}>{ease}</Button>
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