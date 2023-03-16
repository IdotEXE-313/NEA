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
    const[subjectName, setSubjectName] = useState("");
    const[folderID, setFolderID] = useState("");

    //runs when the component mounts
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
        })
    }

    //opens the 'delete subject' overlay
    const handleClick = (SubjectName, FolderID) => {
        setDeleteSubject(true);
        setSubjectName(SubjectName);
        setFolderID(FolderID);
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
                            <CloseButton onClick={(e) => handleClick(subject.SubjectName, subject.FolderID)} className={styles.subjectDelete} />
                            <Card.Body>
                                <Card.Title>{subject.SubjectName}</Card.Title>
                            </Card.Body>
                            <Button onClick={(() => navigate(`/subjects/${subject.FolderID}`))}>Decks</Button>
                        </Card>
                        
                    )
                })}
                <Backdrop open={deleteSubject} sx={{zIndex: 1}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Are you sure you want to delete {subjectName}?</Card.Title>
                            <Card.Text>All decks and cards will be lost</Card.Text>
                            <div className={styles.selectButton}>
                                <Button onClick={() => handleDelete(folderID, userID)}>Yes</Button>
                                <Button onClick={() => setDeleteSubject(false)}>No</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Backdrop>
            </div>
        </>
    )
}

export default Subjects;