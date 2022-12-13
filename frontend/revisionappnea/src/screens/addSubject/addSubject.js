import React from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import Backdrop from "@mui/material/Backdrop";
import Card from 'react-bootstrap/Card';
import './addSubject.css';

const AddSubject = () => {

    const[subjects, setSubjects] = useState([]);
    const[open, setOpen] = useState(false);
    const[subject, setSubject] = useState("");

    const handleOpen = (event) => {
        setOpen(true);
        setSubject(event.target.value);

    }
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchSubjects = async () => {
            await axios.get("http://localhost:3001/get-subjects", {withCredentials: true})
                .then((res) => {
                    console.log(res)
                    setSubjects(res.data.subjectData[0]);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        fetchSubjects();
    }, []);


    return(
        <>
            <NavigationBar />
            <div className="info-container">
                <h1 className="heading">Add A Subject</h1>
                <p className="info-text">Any subjects added here will be displayed in the subjects tab</p>
            </div>
            <div className="subjects-container">
                    {subjects.map((subject) => {
                        return(
                            <Button variant="primary" className="subject-button" key={subject.SubjectID} onClick={handleOpen} value={subject.SubjectName} >
                                {subject.SubjectName}
                            </Button>
                        )
                    })}
            </div>
            <Backdrop open={open} >
                <Card className="confirm-card">
                    <Card.Title>
                        Add {subject} To Your Subjects?
                    </Card.Title>
                    <div className="buttons-container">
                        <Button className="select-button" variant="info">Yes</Button>
                        <Button className="select-button" variant="info" onClick={handleClose}>No</Button>
                    </div>
                </Card>
            </Backdrop>

        </>
    )

}
export default AddSubject;