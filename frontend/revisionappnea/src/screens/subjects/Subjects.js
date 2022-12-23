import React, { useEffect, useState} from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import styles from './Subjects.module.css';

const Subjects = () => {

    const[subjects, setSubjects] = useState([]);

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
                            <Card.Body>
                                <Card.Title>{subject.SubjectName}</Card.Title>
                            </Card.Body>
                            <Button>Decks</Button>
                        </Card>
                    )
                })}
            </div>
        </>
    )
}

export default Subjects;