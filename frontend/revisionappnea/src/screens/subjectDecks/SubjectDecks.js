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

const SubjectDecks = () => {

    const {folderID} = useParams();
    const[addDeck, setAddDeck] = useState(false);
    const[deckName, setDeckName] = useState("");

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
                                    <Button value={visible}>{visible}</Button>
                                </div>
                            )
                        })}
                    
                    <Button>Add Deck</Button>
                </Card>
            </Backdrop>

        </>
    )

}


export default SubjectDecks;