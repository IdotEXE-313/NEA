import React from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";

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
            <div className="mb-3">
                {subjects.map((subject) => {
                    return(
                        <Button variant="primary" key={subject.SubjectID} >
                            {subject.SubjectName}
                        </Button>
                    )
                })}
            </div>

        </>
    )

}
export default AddSubject;