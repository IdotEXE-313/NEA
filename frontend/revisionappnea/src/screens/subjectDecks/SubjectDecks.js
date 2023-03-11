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
    const[deckID, setDeckID] = useState("");
    const[addDeck, setAddDeck] = useState(false);
    const[deckName, setDeckName] = useState("");
    const[visibility, setVisibility] = useState("Private");
    const[deckData, setDeckData] = useState([]);
    const[changeVariant, setChangeVariant] = useState("");
    const[errMessage, setErrMessage] = useState("");
    const[deleteDeck, setDeleteDeck] = useState(false);
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
        await axios.post("http://localhost:3001/add-deck", {
            withCredentials: true,
            deckID: deckID,
            folderID: folderID.folderid,
            deckName: deckName,
            visibility: visibility,
            username: username
        })
        .then((res) => {
            console.log(res);
            if(res.data.inserted){
                window.location.reload(false);
                setAddDeck(false);
            }
            else{
                setErrMessage("Cannot have a blank deck name");
            }
        })
    }

    const handleDeckDeleteRequest = async() => {
        await axios.post("http://localhost:3001/delete-deck", {
            withCredentials: true,
            FolderID: folderID.folderid,
            DeckID: deckID
        })
        .then((res) => {
            console.log(res);
            if(res.data.delete){
                setDeleteDeck(false);
                window.location.reload(false);
            }
            else{
                setErrMessage("Try again later");
            }
        })
    }

    const handleClick = (value) => {
        setVisibility(value);
        setChangeVariant(value);
    }

    const handleOpen = () => {
        setAddDeck(true);
        setChangeVariant("");
    }

    const handleClose = () => {
        setErrMessage("");
        setAddDeck(false);
        setDeckName("");
    }

    const handleDeleteDeckClick = (DeckName, DeckID) => {
        setDeleteDeck(true);
        setDeckName(DeckName);
        setDeckID(DeckID);
    }

    return(
        <>
            <NavigationBar />
            <div className={styles.addDeck}>
                <h1>Decks</h1>
                <Button onClick = {() => handleOpen()}>Add Deck</Button>
            </div>
            <Backdrop open={addDeck} sx={{zIndex: 1}}>
                <Card className={styles.card}>
                    <div className={styles.closeButtonDiv}>
                        <CloseButton onClick={() => handleClose()} className={styles.closeButton} />
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
                    {errMessage}
                    <Button onClick={handleSubmit}>Add Deck</Button>
                </Card>
            </Backdrop>
            <div className={styles.subjectContainer}>
                {deckData.map((deckName) => {
                    return (
                        <>
                        <Card key={deckName.DeckID} className={styles.subjectCard}> 
                            <div className={styles.cardClose}>
                                <CloseButton onClick={() => handleDeleteDeckClick(deckName.DeckName, deckName.DeckID)}/>
                            </div>
                            <Card.Body>
                                <Card.Title>{deckName.DeckName}</Card.Title>
                            </Card.Body>
                            <Button onClick={() => navigate(`/subjects/${folderID.folderid}/${deckName.DeckID}`)}>Go To Deck</Button>
                        </Card>
                        </>
                    )
                })}
            </div>
            <>
            <Backdrop open={deleteDeck} sx={{zIndex: 1}}>
            <Card>
                <Card.Body>
                    <Card.Title>Are You Sure You Want To Delete {deckName}?</Card.Title>
                    <Card.Text style={{textAlign: 'center'}}>All Cards Will Be Lost!</Card.Text>
                    <div className={styles.deleteDeckButtons}>
                        <Button onClick={() => handleDeckDeleteRequest()}>Yes</Button>
                        <Button onClick={() => setDeleteDeck(false)}>No</Button>
                    </div>
                </Card.Body>
            </Card>
            </Backdrop>
        </>

        </>
    )

}


export default SubjectDecks;