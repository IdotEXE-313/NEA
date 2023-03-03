import React, { useEffect, useState} from "react";
import { useParams, useNavigate} from "react-router-dom";
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import styles from './deck.module.css';
import Button from "react-bootstrap/esm/Button";
import { Backdrop} from "@mui/material";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useSearchParams } from "react-router-dom";
import CloseButton from "react-bootstrap/esm/CloseButton";

const Deck = () => {

    const[direct] = useSearchParams();
    const deckID = useParams();
    const[deckData, setDeckData] = useState([]);
    const[addCard, showAddCard] = useState(false);
    const[frontCard, setFrontCard] = useState("");
    const[backCard, setBackCard] = useState("");
    const navigate = useNavigate();
    const isDirect = direct.get("direct");

    useEffect(() => {
        const getDeckData = async () => {
            await axios.post("http://localhost:3001/deck-data", {withCredentials: true, deckID: deckID.deckid})
                .then((res) => {
                    setDeckData(res.data.data[0][0].DeckName);
                })
        }
        getDeckData();
    }, []);

    const submitCard = async () => {
        showAddCard(false);
        console.log(frontCard)
        await axios.post("http://localhost:3001/add-card", {
            withCredentials: true,
            cardFront: frontCard,
            cardBack: backCard,
            deckID: deckID.deckid
        });
    }

    return(
        <>
            <NavigationBar />
            <div className={styles.container}>
                <div className={styles.deckName}>
                    <h3>{deckData}</h3>
                </div>
                <div className={isDirect === "false" ? styles.hideDiv : styles.deckOptions}>
                    <div className={styles.cardOptions}>
                        <h3>Cards</h3>
                        <Button onClick={() => showAddCard(true)}>Add Card</Button>
                        <Button onClick={() => navigate(`/subjects/view-cards/${deckID.deckid}/`)}>View Cards</Button>
                    </div>
                    <h3>Review</h3>
                    <Button onClick={() => navigate(`/review-stack/${deckID.deckid}/`)}>Spaced Recall</Button>
                    <Button onClick={() => navigate(`/review-queue/${deckID.deckid}`)}>Priority Review</Button>
                </div>
                <div className={isDirect === "false" ? styles.addDeckDiv : styles.hideDiv}>
                    <p>You need to add this deck before reviewing or making changes</p>
                    <div className={styles.cardOptions}>
                        <Button onClick={() => navigate(`/subjects/view-cards/${deckID.deckid}/`)}>View Cards</Button>
                        <Button>Add Deck</Button>
                    </div>
                </div>
                <div>
                        <Backdrop open={addCard}>
                        <Card>
                            <div className={styles.closeButtonDiv}>
                                <CloseButton onClick={() => showAddCard(false)} />
                            </div>
                            <div className={styles.addCard}>
                            <Card.Title>Add a Card</Card.Title>
                                <Form.Group>
                                    <Form.Control type="text" onChange={(e) => setFrontCard(e.target.value)} placeholder="Front of Card"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="text" onChange={(e) => setBackCard(e.target.value)} placeholder="Back of Card"></Form.Control>
                                </Form.Group>
                                <Button onClick={submitCard}>Add Card</Button>
                            </div>
                        </Card>
                        </Backdrop>
                    </div>
            </div>
        </>
    )
}

export default Deck;