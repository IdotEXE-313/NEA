import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from '../../screens/subjectDecks/deck.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Backdrop } from '@mui/material';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


const UnownedDecks = (props) => {

    const navigate = useNavigate();
    const username = localStorage.getItem("Username");
    const deckID = props.deckID;
    const[addDeck, setAddDeck] = useState(false);

    const handleAddDeck = async() => {
        await axios.post("http://localhost:3001/insert-visible-deck", {
            withCredentials: true,
            DeckID: deckID,
            Username: username
        })
        .then((res) => {
            if(res.data.inserted){
                setAddDeck(false);
            }
            
        })
    }

    return (
        <>
             <div className={styles.addDeckDiv}>
                    <p>You need to add this deck before reviewing or making changes. If you have already added this deck, access the deck through 'Your Subjects'</p>
                    <div className={styles.cardOptions}>
                        <Button onClick={() => navigate(`/subjects/view-cards/${deckID}/?direct=false`)}>View Cards</Button>
                        <Button onClick={() => setAddDeck(true)}>Add Deck</Button>
                    </div>
            </div>
            <div>
                <Backdrop open={addDeck}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Adding Deck {props.deckName}?</Card.Title>
                                <div className={styles.addDeckButtons}>
                                    <div className={styles.addDeckButtons}>
                                        <Button onClick={() => handleAddDeck()}>Yes</Button>
                                        <Button onClick={() => setAddDeck(false)}>No</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                </Backdrop>
            </div>
        </>
    )
}


export default UnownedDecks;