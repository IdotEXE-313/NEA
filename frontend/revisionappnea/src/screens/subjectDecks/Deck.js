import React, { useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import styles from './deck.module.css';
import { useSearchParams } from "react-router-dom";
import OwnedDecks from "../../components/deckOwnership/OwnedDecks";
import UnownedDecks from "../../components/deckOwnership/UnownedDecks";

const Deck = () => {

    const[direct] = useSearchParams();
    const deckID = useParams();
    const[deckName, setDeckName] = useState([]);
    const isDirect = direct.get("direct");

    useEffect(() => {
        const getDeckData = async () => {
            await axios.post("http://localhost:3001/deck-data", {withCredentials: true, deckID: deckID.deckid})
                .then((res) => {
                    setDeckName(res.data.data[0][0].DeckName);
                })
        }
        getDeckData();
    }, []);


    return(
        <>
            <NavigationBar />
            <div className={styles.container}>
                <div className={styles.deckName}>
                    <h3>{deckName}</h3>
                </div>
            </div>
            {isDirect === "false" ? <UnownedDecks deckID={deckID.deckid} deckName={deckName} /> : <OwnedDecks deckID={deckID.deckid}/>}
        </>
    )
}

export default Deck;