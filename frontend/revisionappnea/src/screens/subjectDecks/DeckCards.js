import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import styles from './deck.module.css';
import NavigationBar from "../../components/navigation/navigationbar";
import { Backdrop } from "@mui/material";
import Form from 'react-bootstrap/Form';
import CloseButton from "react-bootstrap/esm/CloseButton";

const DeckCards = () => {

    const[cards, setCards] = useState({});
    const deckID = useParams();
    const [direct] = useSearchParams();
    const isDirect = direct.get("direct");
    const[editCard, setEditCard] = useState(false);
    const[cardFront, setCardFront] = useState("");
    const[cardID, setCardID] = useState("");
    const[errMessage, setErrMessage] = useState("");
    const[cardBack, setCardBack] = useState("");

    useEffect(() => {
        const getCardData = async() => {
            await axios.post("http://localhost:3001/card-data", {
                withCredentials: true,
                deckID: deckID.deckid
            })
            .then((response) => {
                setCards(response.data[0]);
            })
            .catch((err) => {
                console.log(err);
            })
        }  
        getCardData();
    }, [])

    const handleDelete = async(CardID) => {
        await axios.post("http://localhost:3001/delete-card",{
            withCredentials: true,
            cardID: CardID
        })
        .then((res) => {
            window.location.reload(false);
        })
    }

    const handleEditRequest = async(CardID) => {
        
        setCardID(CardID);
        setEditCard(true);
    }

    const submitEdit = async() => {
        await axios.post("http://localhost:3001/edit-card", {
            withCredentials: true,
            CardFront: cardFront,
            CardBack: cardBack,
            CardID: cardID
        })
        .then((res) => {
            if(res.data.edited){
                setEditCard(false);
                window.location.reload(false);
            }
            else{
                setErrMessage("Ensure your edit is between 0 and 255 characters and try again");
            }
        })
    }

    return (
        <>
            <NavigationBar />
            <div className={styles.title}>
                <h1>Cards in Selected Deck</h1>
            </div>
            <div className={styles.content}>
                {Object.keys(cards).map((key) => {
                    return (
                        <Card style={{width: '18rem', textAlign: 'center'}}>
                            <Card.Body>
                                <Card.Text>Front: {cards[key].CardFront}</Card.Text>
                                <Card.Text>Back: {cards[key].CardBack}</Card.Text>
                                <div className={isDirect === "false" ? styles.hideDiv : ""}>
                                    <Button onClick={() => handleDelete(cards[key].CardID)}>Delete</Button>
                                    <Button onClick={() => handleEditRequest(cards[key].CardID)}>Edit</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })}
                <Backdrop open={editCard} sx={{zIndex: 1}}>
                    <Card style={{width: '18rem', textAlign: 'center'}}>
                    <div className={styles.closeButton}>
                            <CloseButton onClick={() => setEditCard(false)}/>
                        </div>
                        <Card.Body>
                        <div>
                        <Card.Title>Edit Card</Card.Title>
                            <Form.Group className={styles.form}>
                                <Form.Control type="text" placeholder="Front" onChange={(e) => setCardFront(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group className={styles.form}>
                                <Form.Control type="text" placeholder="Back" onChange={(e) => setCardBack(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button onClick={() => submitEdit()}>Submit Edits</Button>
                            <div>   
                                {errMessage}
                            </div>
                        </div>
                        </Card.Body>
                    </Card>
                </Backdrop>
            </div>
        </>
    )
}

export default DeckCards;