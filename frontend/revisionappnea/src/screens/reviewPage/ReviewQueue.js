import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import styles from './review.module.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ReviewQueue = () => {

    const deckID = useParams();
    const[cardData, setCardData] = useState([]);
    const[cardBack, setCardBack] = useState("");
    const[cardFront, setCardFront] = useState("");
    const[revealBack, setRevealBack] = useState(false);
    const[visibilityReveal, setVisiblityReveal] = useState("");
    const[visibilityOptions, setVisibilityOptions] = useState("d-none");


    useEffect(() => {
        const queueCards = async() => {
            await axios.post("http://localhost:3001/card-data-queue", { //adds cards onto the queue
                withCredentials: true,
                deckID: deckID.deckid
            })
            .then(() => {
                dequeueCard(); //we dequeuea card here to get out first card off the created queue
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
                setCardData(res.data.cardData);
                showCardFront();

                if(cardData !== null){
                    setCardBack(cardData.value.CardBack); //separate variables since their state needs to differ from their initial values
                    setCardFront(cardData.value.CardFront);
                    console.log(cardData.value.Priority);
                }
                else{
                    setCardFront("Queue Finished");
                    setVisiblityReveal("d-none");
                }
            })
    
    }

    const updateCardPriority = async (newPriority) => {
        dequeueCard();
        await axios.post("http://localhost:3001/update-card-priority", {
            withCredentials: true,
            priority: newPriority,
            deckID: cardData.value.DeckID,
            cardID: cardData.value.CardID
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
                Priority: {cardData.value.Priority}
            </div>
            <div className={styles.cardContainer}>
                <Card className={styles.reviewCard}>
                    <Card.Body>
                        <Card.Title>{revealBack ? cardBack : cardFront}</Card.Title>
                    </Card.Body>
                    <Button onClick={showCardBack} className={visibilityReveal}>Reveal Back</Button>
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

                </Card>
            </div>
        </>
    )
}

export default ReviewQueue;