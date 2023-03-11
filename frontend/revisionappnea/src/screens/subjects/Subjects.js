import React, { useEffect, useState} from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import styles from './Subjects.module.css';
import { useNavigate } from "react-router-dom";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { Backdrop } from "@mui/material";


const Subjects = () => {

    const[subjects, setSubjects] = useState([]);
    const[userID, setUserID] = useState();
    const navigate = useNavigate();
    const[deleteSubject, setDeleteSubject] = useState(false);

    useEffect(() => {
        const getSubjectsTaken = async () => {
            await axios.get("http://localhost:3001/subjects-taken", {withCredentials: true})
                .then((res) => {
                    const subjectsTaken = res.data.subjectsTaken[0];
                    const userID = res.data.UserID;
                    setSubjects(subjectsTaken);
                    setUserID(userID);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getSubjectsTaken();
    }, []);

    const handleDelete = async(folderID, userID) => {
        await axios.post("http://localhost:3001/delete-subject", {
            withCredentials: true,
            FolderID: folderID,
            UserID: userID
        })
        .then((res) => {
            window.location.reload(false);
            console.log(res);
        })
    }

    return(
        <>
            <NavigationBar />
            <div className={styles.title}>
                <h1>Your Subject Folders</h1>
            </div>  
            <div className={styles.subjectContainer}>
                {subjects.map((subject) => {
                    return(
                        <Card className={styles.subjectCard}>
                            <CloseButton onClick={() => setDeleteSubject(true)} className={styles.subjectDelete} />
                            <Card.Body>
                                <Card.Title>{subject.SubjectName}</Card.Title>
                            </Card.Body>
                            <Button onClick={(() => navigate(`/subjects/${subject.FolderID}`))}>Decks</Button>
                            <Backdrop open={deleteSubject} sx={{zIndex: 1}}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Are you sure you want to delete {subject.SubjectName}?</Card.Title>
                                        <Card.Text>All decks and cards will be lost</Card.Text>
                                        <div className={styles.selectButton}>
                                            <Button onClick={() => handleDelete(subject.FolderID, userID)}>Yes</Button>
                                            <Button onClick={() => setDeleteSubject(false)}>No</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Backdrop>
                        </Card>
                        
                    )
                })}
            </div>
        </>
    )
}

export default Subjects;