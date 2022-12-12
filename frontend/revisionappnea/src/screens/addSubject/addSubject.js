import React from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import './addSubject.css';

const AddSubject = () => {

    const[subjects, setSubjects] = useState([]);

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
            <div className="subjects-container">
                    {subjects.map((subject) => {
                        return(
                            <Button variant="primary" className="subject-button" key={subject.SubjectID} >
                                {subject.SubjectName}
                            </Button>
                        )
                    })}
            </div>

        </>
    )

}
export default AddSubject;