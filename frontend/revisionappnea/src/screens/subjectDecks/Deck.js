import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import styles from './deck.module.css';
import Button from "react-bootstrap/esm/Button";

const Deck = () => {

    const deckID = useParams();
    const[deckData, setDeckData] = useState([]);

    useEffect(() => {
        const getDeckData = async () => {
            await axios.post("http://localhost:3001/deck-data", {withCredentials: true, deckID: deckID.deckid})
                .then((res) => {
                    setDeckData(res.data.data[0][0].DeckName);
                })
        }
        getDeckData();
    }, [])

    return(
        <>
            <NavigationBar />
            <div className={styles.container}>
                <div className={styles.deckName}>
                    <h3>{deckData}</h3>
                </div>
                <div className={styles.deckOptions}>
                    <h3>Cards</h3>
                    <Button>Add Card</Button>
                    <Button>View Cards</Button>
                    <h3>Review</h3>
                    <Button>Review All</Button>
                    <Button>Priority Review</Button>
                </div>
            </div>
        </>
    )
}

export default Deck;