import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from '../../screens/subjectDecks/deck.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Backdrop } from '@mui/material';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/esm/CloseButton';

const OwnedDecks = (props) => {

    const deckID = props.deckID;
    const navigate = useNavigate();
    const[addCard, setAddCard] = useState(false);
    const[cardFront, setCardFront] = useState("");
    const[cardBack, setCardBack] = useState("");
    const[errMessage, setErrMessage] = useState("");


    const submitCard = async () => {
        setAddCard(false); //closes the 'add card' overlay
        await axios.post("http://localhost:3001/add-card", {
            withCredentials: true,
            cardFront: cardFront,
            cardBack: cardBack,
            deckID: deckID
        });
    }

    return (
        <>
             <div className={styles.deckOptions}>
                    <div className={styles.cardOptions}>
                        <h3>Cards</h3>
                        <Button onClick={() => setAddCard(true)}>Add Card</Button>
                        <Button onClick={() => navigate(`/subjects/view-cards/${deckID}/`)}>View Cards</Button>
                    </div>
                    <h3>Review</h3>
                    <Button onClick={() => navigate(`/review-stack/${deckID}/`)}>Spaced Recall</Button>
                    <Button onClick={() => navigate(`/review-queue/${deckID}`)}>Priority Review</Button>
                </div>
                <div>
                        <Backdrop open={addCard}>
                        <Card>
                            <div className={styles.closeButtonDiv}>
                                <CloseButton onClick={() => setAddCard(false)} />
                            </div>
                            <div className={styles.addCard}>
                            <Card.Title>Add a Card</Card.Title>
                                <Form.Group>
                                    <Form.Control type="text" onChange={(e) => setCardFront(e.target.value)} placeholder="Front of Card"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="text" onChange={(e) => setCardBack(e.target.value)} placeholder="Back of Card"></Form.Control>
                                </Form.Group>
                                <div>
                                    {errMessage}
                                </div>
                                {/*Ensures that the front and back of the card cannot be blank */}
                                <Button onClick={() => {cardFront.length !== 0 && cardBack.length !== 0 ? submitCard() : setErrMessage("Cannot Submit a Blank Field")}}>Add Card</Button>
                            </div>
                        </Card>
                        </Backdrop>
                    </div>
        </>
    )
}

export default OwnedDecks;