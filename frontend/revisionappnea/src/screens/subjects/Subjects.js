import React, { useEffect, useState} from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import styles from './Subjects.module.css';
import { useNavigate } from "react-router-dom";

const Subjects = () => {

    const[subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getSubjectsTaken = async () => {
            await axios.get("http://localhost:3001/subjects-taken", {withCredentials: true})
                .then((res) => {
                    setSubjects(res.data.subjectsTaken[0]);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getSubjectsTaken();
    }, []);

    const generatePath = (subject) => {
        const subjectName = subject.replace(" ", "-");
        return `/subjects/${subjectName}/`;
    }

    return(
        <>
            <NavigationBar />
            <div className={styles.title}>
                <h1>Your Subjects</h1>
                <p className={styles.info}>Use this page to access your decks for each subject</p>
            </div>  
            <div className={styles.subjectContainer}>
                {subjects.map((subject) => {
                    return(
                        <Card className={styles.subjectCard}>
                            <Card.Body>
                                <Card.Title>{subject.SubjectName}</Card.Title>
                            </Card.Body>
                            <Button onClick={() => navigate(generatePath(subject.SubjectName))}>Decks</Button>
                        </Card>
                    )
                })}
            </div>
        </>
    )
}

export default Subjects;