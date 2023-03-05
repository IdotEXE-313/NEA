import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import styles from './deck.module.css';
import NavigationBar from "../../components/navigation/navigationbar";

const DeckCards = () => {

    const[cards, setCards] = useState({});
    const deckID = useParams();
    const [direct] = useSearchParams();
    const isDirect = direct.get("direct");

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
                        {console.log(cards)}
                            <Card.Body>
                                <Card.Text>Front: {cards[key].CardFront}</Card.Text>
                                <Card.Text>Back: {cards[key].CardBack}</Card.Text>
                                <div className={isDirect === "false" ? styles.hideDiv : ""}>
                                    <Button onClick={() => handleDelete(cards[key].CardID)}>Delete</Button>
                                    <Button>Edit</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </>
    )
}

export default DeckCards;