import React, { useEffect } from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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
    const[visibility, setVisibility] = useState("Private");
    const[deckData, setDeckData] = useState([]);
    const[changeVariant, setChangeVariant] = useState("");
    const username = localStorage.getItem("Username");

    const navigate = useNavigate();

    useEffect(() => {
        const getDeckData = async () => {
            await axios.post("http://localhost:3001/get-decks", {withCredentials: true, folderID: folderID.folderid})
                .then((response) => {
                    setDeckData(response.data.deckData[0]);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getDeckData();
    }, [])  

    const handleSubmit = async () => {
        const deckID = Math.floor(Math.random() + Date.now());
        setAddDeck(false);
        window.location.reload(false);
        await axios.post("http://localhost:3001/add-deck", {
            withCredentials: true,
            deckID: deckID,
            folderID: folderID.folderid,
            deckName: deckName,
            visibility: visibility,
            username: username
        })
    }

    const handleClick = (value) => {
        setVisibility(value);
        setChangeVariant(value);
    }

    const handleClose = () => {
        setAddDeck(true);
        setChangeVariant("");
    }

    return(
        <>
            <NavigationBar />
            <div className={styles.addDeck}>
                <h1>Decks</h1>
                <Button onClick = {() => handleClose()}>Add Deck</Button>
            </div>
            <Backdrop open={addDeck} sx={{zIndex: 1}}>
                <Card className={styles.card}>
                    <div className={styles.closeButtonDiv}>
                        <CloseButton onClick={() => setAddDeck(false)} className={styles.closeButton} />
                    </div>
                    <Card.Title>Add a Deck</Card.Title>
                    <Form.Group>
                        <Form.Control type="text" onChange={(e) => setDeckName(e.target.value)} placeholder="Deck Name"></Form.Control>
                    </Form.Group>
                    <div className={styles.buttonDiv}>
                    {["Public", "Internal", "Private"].map((visible) => {
                            return(
                                <div className={styles.visibleButtons}>
                                    <Button value={visible} variant={changeVariant === visible ? "primary" : "outline-primary"} onClick={(e) => handleClick(e.target.value)}>{visible}</Button>
                                </div>
                            )
                        })}
                    </div>
                    <Button onClick={handleSubmit}>Add Deck</Button>
                </Card>
            </Backdrop>
            <div className={styles.subjectContainer}>
                {deckData.map((deckName) => {
                    return (
                        <Card key={deckName.DeckID} className={styles.subjectCard}> 
                            <Card.Body>
                                <Card.Title>{deckName.DeckName}</Card.Title>
                            </Card.Body>
                            <Button onClick={() => navigate(`/subjects/${folderID.folderid}/${deckName.DeckID}`)}>Go To Deck</Button>
                        </Card>
                    )
                })}
            </div>

        </>
    )

}


export default SubjectDecks;