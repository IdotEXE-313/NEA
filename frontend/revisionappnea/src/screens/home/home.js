import React, { useEffect, useState } from "react";
import styles from './home.module.css';
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import Card from 'react-bootstrap/Card';

const Home = () => {

    const username = localStorage.getItem("Username");
    const[userSchoolInfo, setUserSchoolInfo] = useState({});
    const[userSubjectInfo, setUserSubjectInfo] = useState({});
    const[userID, setUserID] = useState("");
    const[publicDecks, setPublicDecks] = useState({});

    useEffect(() => {
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
        
    }, []);

    useEffect(() => {
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
                let subjectData = res.data;
                console.log(res);

                setPublicDecks((prevState) => {
                    if(subjectData.length > 0){
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
    }, [userSubjectInfo]);

    const checkForNull = () => {

    }

    return(
        <div>
            <NavigationBar />
             <div className={styles.title}>
                <h1>Hello {username}</h1>    
            </div>
            <div className={styles.content}>
                <div className={styles.schoolTitle}>
                    Other decks from {userSchoolInfo.schoolName}
                </div>
            </div>
            {/* {Object.keys(userSubjectInfo).map((key) => {
                return (
                    <div>
                        <Card>
                            <Card.Body>
                                <Card.Title>{checkForNull() ? "No Data" : "test"}</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })} */}
        </div>
        
    )
}

export default Home;