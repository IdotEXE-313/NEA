import React, { useEffect, useRef, useState } from "react";
import styles from './home.module.css';
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";
import InternalDecks from "../../components/internalDecks/InternalDecks";
import PublicDecks from "../../components/publicDecks/PublicDecks";

const Home = () => {

    const username = localStorage.getItem("Username");
    const[userSchoolInfo, setUserSchoolInfo] = useState({});
    const[userSubjectInfo, setUserSubjectInfo] = useState({});
    const[userID, setUserID] = useState("");
    const[internalDecks, setInternalDecks] = useState({});
    const[publicDecks, setPublicDecks] = useState({});
    const finished = useRef(false);

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
                finished.current = true;
            })
            .catch((err) => {
                console.log(err);
            })
        }
        getUserData();

        return () => abortController.abort(); //prevents useEffect from being run more than once in development
        
    }, []);

    useEffect(() => {

        const getInternalDecks = async(SubjectID) => {
            await axios.post("http://localhost:3001/internal-decks", {
                withCredentials: true,
                UserID: userID,
                SubjectID: SubjectID,
                SchoolID: userSchoolInfo.schoolID
            })
            .then((response) => {
                setInternalDecks((prevState) => {
                    const data = response.data[0];
                    if(data.length > 0){
                        return {...prevState, data}
                    }
                    return prevState;
                })
            })
        }

        const getPublicDecks = async(SubjectID) => {
            await axios.post("http://localhost:3001/public-decks", {
                withCredentials: true,
                UserID: userID,
                SubjectID: SubjectID,
                SchoolID: userSchoolInfo.schoolID
            })
            .then((response) => {
                setPublicDecks((prevState) => {
                    const data = response.data[0];
                    if(data.length > 0){
                        return {...prevState, data}
                    }
                    return prevState;
                })
            })
        }

        if(finished.current){
            const invokeGetInternalDecks = async () => {
                Object.keys(userSubjectInfo).map(async(key) => {
                    await getInternalDecks(userSubjectInfo[key].SubjectID);
                })
            }

            const invokeGetPublicDecks = async() => {
                Object.keys(userSubjectInfo).map(async(key) => {
                    await getPublicDecks(userSubjectInfo[key].SubjectID);
                })
            }
            invokeGetInternalDecks();
            invokeGetPublicDecks();
        }
    }, [userSubjectInfo]);


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
                <InternalDecks internalDecks={internalDecks}/>
            </div>
            <div className={styles.schoolTitle}>
                <h3>Other Decks From The Public</h3>
            </div>
            <div className={styles.content}>
                <PublicDecks publicDecks={publicDecks} />
            </div>
            
        </div>
    )
}

export default Home;