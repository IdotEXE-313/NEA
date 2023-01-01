import React from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import styles from './subjectdecks.module.css';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import { Backdrop } from "@mui/material";
import Form from 'react-bootstrap/Form';
import CloseButton from "react-bootstrap/esm/CloseButton";
import axios from "axios";

const SubjectDecks = () => {

    const folderID = useParams();
    const[addDeck, setAddDeck] = useState(false);
    const[deckName, setDeckName] = useState("");
    const[visibility, setVisibility] = useState("Public");

    const handleSubmit = async () => {
        await axios.post("http://localhost:3001/add-deck", {
            withCredentials: true,
            folderID: folderID.folderid,
            deckName: deckName,
            visibility: visibility
        })
    }

    return(
        <>
            <NavigationBar />
            <div className={styles.addDeck}>
                <h1>Decks</h1>
                <Button onClick = {() => setAddDeck(true)}>Add Deck</Button>
            </div>
            <Backdrop open={addDeck}>
                <Card className={styles.card}>
                    <div className={styles.closeButtonDiv}>
                        <CloseButton onClick={() => setAddDeck(false)} className={styles.closeButton} />
                    </div>
                    <Card.Title>Add a Deck</Card.Title>
                    <Form.Group>
                        <Form.Control type="text" onChange={(e) => setDeckName(e.target.value)} placeholder="Deck Name"></Form.Control>
                    </Form.Group>

                        {["Public", "Internal", "Private"].map((visible) => {
                            return(
                                <div className={styles.visibleButtons}>
                                    <Button value={visible} variant="outline-primary" onClick={(e) => setVisibility(e.target.value)}>{visible}</Button>
                                </div>
                            )
                        })}
                    
                    <Button onClick={handleSubmit}>Add Deck</Button>
                </Card>
            </Backdrop>

        </>
    )

}


export default SubjectDecks;