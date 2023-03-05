import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const InternalDecks = (props) => {

    const navigate = useNavigate();

    return (
        <>
            {Object.values(props.internalDecks).map((value) => {
                return (
                    Object.values(value).map((key, index) => {
                        return (
                            <div>
                                <Card style={{width: '18rem', textAlign: 'center'}}>
                                    <Card.Body>
                                        <Card.Title>{key.DeckName}</Card.Title>
                                        <Card.Text>Subject: {key.SubjectName}</Card.Text>
                                    </Card.Body>
                                    <Button onClick={() => navigate(`/subjects/${key.FolderID}/${key.DeckID}?direct=false`)}>Go To Deck</Button>
                                </Card>
                            </div>
                    )
                })
                )
             })}
        </>
    )
}

export default InternalDecks;