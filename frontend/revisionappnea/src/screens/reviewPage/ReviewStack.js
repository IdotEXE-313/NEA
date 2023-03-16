import React from "react";
import { useState, useEffect, useRef } from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/Card';
import styles from './review.module.css';

const ReviewStack = () => {

    const deckID= useParams();
    const[cardFront, setCardFront] = useState("");
    const[cardBack, setCardBack] = useState("");
    const[cardID, setCardID] = useState("");
    const[revealBack, setRevealBack] = useState(false);
    const[visibilityReveal, setVisiblityReveal] = useState("");
    const[reviewDate, setNextReviewDate] = useState("");
    const[visibilityOptions, setVisibilityOptions] = useState("d-none");
    const firstCall = useRef(false);

    useEffect(() => {
        const getCardData = async() => {
            await axios.post("http://localhost:3001/card-data-stack", {withCredentials: true, deckID: deckID.deckid})
                .then((res) => {
                    console.log(res);
                    if(res.data.noData){
                        const date = res.data.nextDate.NextReviewDate;
                        setCardFront("No Cards To Review Today");
                        setNextReviewDate(`Next Review Date: ${date.slice(0,10)}`); //the date string will always be in the format YYYY-MM-DD, so it is safe to splice from index 0 to index 10 and always get a valid date
                        setVisiblityReveal("d-none");
                    }
                    else if(res.data.finished){
                        dequeueCardStack(); //dequeue the first card on the queue
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getCardData();
    }, []);

    const dequeueCardStack = async(grade=null) => {
            //takes a card off the queue. Values will therefore be updated here
            await axios.get("http://localhost:3001/card-data-stack")
            .then((res) => {
                //if response, then set the necessary values to review the card
                setVisibilityOptions("d-none"); 
                setRevealBack(false);
                setVisiblityReveal("");
                if(res.data.cardData !== null){ 
                    setCardFront(res.data.cardData.CardFront);
                    setCardBack(res.data.cardData.CardBack);
                    setCardID(res.data.cardData.CardID);
                }
                else{
                    setCardFront("Stack Finished");
                    setVisiblityReveal("d-none");
                }
            })
            .catch((err) => {
                console.log(err);
            })

        //updates the next review date (based off the grade)
        await axios.post("http://localhost:3001/update-date", {
            withCredentials: true,
            grade: grade,
            cardID: cardID
        });
        
        
    }

    //enables you to see the back of the card
    const handleClick = () => {
        setRevealBack(true);
        setVisiblityReveal("d-none"); //hides the 'reveal back' button
        setVisibilityOptions(""); //reveals the 0 - 5 scale
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
                    <div className={styles.easeButtons}>
                    {[0, 1, 2, 3, 4, 5].map((ease, priority) => {
                        return(
                            <div className={styles.visibilityContainer}>
                                <div className={visibilityOptions}>
                                        <Button value={ease} onClick={() => dequeueCardStack(priority)}>{ease}</Button>
                                </div>
                            </div>
                    )})}
                    </div>
                    {reviewDate}
                </Card>
            </div>

        </>
    )
}

export default ReviewStack;