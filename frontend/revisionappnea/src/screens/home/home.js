import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './home.module.css';
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Home = () => {

    const username = localStorage.getItem("Username");
    const[userSchoolInfo, setUserSchoolInfo] = useState({});
    const[userSubjectInfo, setUserSubjectInfo] = useState({});
    const[userID, setUserID] = useState("");
    const[publicDecks, setPublicDecks] = useState({});
    const[subjectName, setSubjectName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const abortController = new AbortController();

        const getUserData = async () => {
            await axios.post("http://localhost:3001/user-data",{
                withCredentials: true,
                username: username
            }).then((res) => {
                setUserSchoolInfo({
                    schoolName: res.data.schoolInfo.schoolName,
                    schoolID: res.data.schoolInfo.schoolID
                });
                setUserSubjectInfo(res.data.subjects);
                setUserID(res.data.UserID);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        getUserData();

        return () => abortController.abort(); //prevents useEffect from being run more than once in development
        
    }, []);

    useEffect(() => {

        const abortController = new AbortController();

        const invokeGetPublicDecks = () => {
            Object.entries(userSubjectInfo).forEach(([key, value]) => {
                getPublicDecks(userSubjectInfo[key].SubjectID);
            });
    
        }
    
        const getPublicDecks = async (SubjectID) => {
            await axios.post("http://localhost:3001/public-decks", {
                withCredentials: true,
                SchoolID: userSchoolInfo.schoolID,
                SubjectID: SubjectID,
                UserID: userID
            })
            .then((res) => {
                let subjectData = res.data[0];

                setPublicDecks((prevState) => {
                    if(typeof(subjectData) != "undefined"){
                        getSubjectName(SubjectID);
                        return {...prevState, subjectData}
                    }
                    return prevState;
                });
                
            })
            .catch((err) => {
                console.log(err);
            })
        }
        invokeGetPublicDecks();

        return () => abortController.abort(); //side effect of react development: this prevents useEffect being called more than twice

    }, [userSubjectInfo]);

    const getSubjectName = async(SubjectID) => {
        await axios.post("http://localhost:3001/subject-name", {
            withCredentials: true,
            SubjectID: SubjectID
        })
        .then((res) => {
            let subjectName = res.data[0][0].SubjectName;
            setSubjectName(subjectName);
        })
        .catch((err) => {
            return "Err getting subject name";
        })
    }

    return (
        <div>
            <NavigationBar />
            <div className={styles.title}>
                <h1>Hello {username}</h1>
            </div>
            <div className={styles.schoolTitle}>
                <h3>Other Decks From {userSchoolInfo.schoolName}</h3>
            </div>
            <div className={styles.content}>
            {Object.values(publicDecks).map((value) => {
                return (
                    Object.values(value).map((key, index) => {
                        return (
                            <div>
                                <Card style={{width: '18rem', textAlign: 'center'}}>
                                    <Card.Body>
                                        <Card.Title>{value[index].DeckName}</Card.Title>
                                        <Card.Text>Subject: {subjectName}</Card.Text>
                                    </Card.Body>
                                    <Button onClick={() => navigate(`/subjects/${value[index].FolderID}/${value[index].DeckID}`)}>Go To Deck</Button>
                                </Card>
                            </div>
                    )
                })
                )
            })}
            </div>
            
        </div>
    )
}

export default Home;