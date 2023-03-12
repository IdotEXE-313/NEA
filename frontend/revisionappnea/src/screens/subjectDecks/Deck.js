import React, { useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import styles from './deck.module.css';
import { useSearchParams } from "react-router-dom";
import OwnedDecks from "../../components/deckOwnership/OwnedDecks";
import UnownedDecks from "../../components/deckOwnership/UnownedDecks";
import Button from 'react-bootstrap/Button';
import { Backdrop } from "@mui/material";
import Card from 'react-bootstrap/Card';
import CloseButton from "react-bootstrap/esm/CloseButton";

const Deck = () => {

    const[direct] = useSearchParams();
    const deckID = useParams();
    const[deckName, setDeckName] = useState([]);
    const[editDeckVisibility, setEditDeckVisibility] = useState(false);
    const[currentVisibility, setCurrentVisibility] = useState("");
    const[errMessage, setErrMessage] = useState("");
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

    const handleDeckVisibilityRequest = async() => {
        if(!currentVisibility.length > 0){
            setErrMessage("Must Select A Visibility");
            return;
        }
        await axios.post("http://localhost:3001/update-visibility", {
            withCredentials: true,
            newVisibility: currentVisibility,
            deckID: deckID.deckid
        })
        .then((res) => {
            const isUpdated = res.data.updated;
            if(isUpdated){
                setEditDeckVisibility(false);
                setErrMessage("");
            }
            else{
                setErrMessage("Cannot set Visibility to Current Visibility");
            }
        })

    }


    return(
        <>
            <NavigationBar />
            <div className={styles.container}>
                <div className={styles.deckName}>
                    <h3>{deckName}</h3>
                        <div className={isDirect === "false" ? styles.hideDiv : styles.deckVisibility}>
                            <Button onClick={() => setEditDeckVisibility(true)}>Edit Visibility</Button>
                        </div>
                </div>
                <Backdrop open={editDeckVisibility} sx={{zIndex: 1}}>
                    <Card>
                        <CloseButton className={styles.closeButton} onClick={() => setEditDeckVisibility(false)}/>
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>Edit Visibility</Card.Title>
                            {["Public", "Internal", "Private"].map((visibility) => {
                                return (
                                    <Button className={styles.button} value={visibility} variant={currentVisibility === visibility ? "primary" : "outline-primary"} onClick={(e) => setCurrentVisibility(e.target.value)}>{visibility}</Button>
                                )
                            })}
                            <div className={styles.submitButton}>
                                <Button onClick={() => handleDeckVisibilityRequest()}>Submit</Button>
                            </div>
                            {errMessage}
                        </Card.Body>
                    </Card>
                </Backdrop>
            </div>
            {isDirect === "false" ? <UnownedDecks deckID={deckID.deckid} deckName={deckName} /> : <OwnedDecks deckID={deckID.deckid}/>}
        </>
    )
}

export default Deck;