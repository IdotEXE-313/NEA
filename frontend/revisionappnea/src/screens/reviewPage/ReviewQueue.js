import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import styles from './review.module.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ReviewQueue = () => {

    const deckID = useParams();
    const[cardID, setCardID] = useState("");
    const[cardBack, setCardBack] = useState("");
    const[cardFront, setCardFront] = useState("");
    const[revealBack, setRevealBack] = useState(false);
    const[priority, setPriority] = useState(null);
    const[visibilityReveal, setVisiblityReveal] = useState("");
    const[visibilityOptions, setVisibilityOptions] = useState("d-none");


    useEffect(() => {
        const queueCards = async() => {
            await axios.post("http://localhost:3001/card-data-queue", { //adds cards onto the queue
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
    }, []);


    const dequeueCard = async () => {
        await axios.get("http://localhost:3001/card-data-queue")
            .then((res) => {
                if(res.data.cardData == null){
                    endCardUpdate();
                }
                else{
                    let cardDataRes = res.data.cardData.value;
                    setPriority(cardDataRes.Priority);
                    setCardFront(cardDataRes.CardFront);
                    setCardBack(cardDataRes.CardBack);
                    setCardID(cardDataRes.CardID);
                    showCardFront();
                }
                console.log(res);
                
            })
            .catch((err) => {
                console.log(err);
            })
            
        };
    

    const endCardUpdate = () => {
        setCardFront("Queue Finished");
        setVisiblityReveal("d-none");
        setRevealBack(false);
        setVisibilityOptions("d-none");
    }

    const updateCardPriority = async (newPriority) => {
        dequeueCard();
        await axios.post("http://localhost:3001/update-card-priority", {
            withCredentials: true,
            priority: newPriority,
            deckID: deckID.deckid,
            cardID: cardID
        });
    }
    

    const showCardFront = () => {
        setVisibilityOptions("d-none");
        setRevealBack(false);
        setVisiblityReveal("");
    }


    const showCardBack = () => {
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
                    <Button onClick={showCardBack} className={visibilityReveal}>Reveal Back</Button>
                    <div className={styles.reviewContainer}>
                    {["Easy", "Good", "Challenging", "Hard"].map((ease, index) => {
                        return(
                            <div className={styles.visibilityContainer}>
                                <div className={visibilityOptions}>
                                    <div className={styles.easeButtons}>
                                        <Button value={index} onClick={(e) => updateCardPriority(e.target.value)}>{ease}</Button>
                                    </div>
                                </div>
                            </div>
                        )
            })}
                    </div>

                </Card>
            </div>
        </>
    )
}

export default ReviewQueue;