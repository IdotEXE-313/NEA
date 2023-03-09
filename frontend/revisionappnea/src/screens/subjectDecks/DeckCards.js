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

const DeckCards = () => {

    const[cards, setCards] = useState({});
    const deckID = useParams();
    const [direct] = useSearchParams();
    const isDirect = direct.get("direct");
    const[cardData, setCardData] = useState({});
    const[editCard, setEditCard] = useState(false);

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
        await axios.post("http://localhost:3001/card-info", {
            withCredentials: true,
            CardID: CardID
        })
        .then((res) => {
            if(res.data){
                setCardData(res.data[0]);
                setEditCard(true);
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
                        <Card.Body>
                            <Card.Title>Edit Card</Card.Title>
                            <Form.Group>
                                <Form.Label>Front: </Form.Label>
                                <Form.Control type="text" placeholder={cardData.CardFront}></Form.Control>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Backdrop>
            </div>
        </>
    )
}

export default DeckCards;