import React, { useEffect, useState } from "react";
import styles from './home.module.css';
import NavigationBar from "../../components/navigation/navigationbar";
import axios from "axios";

const Home = () => {

    const username = localStorage.getItem("Username");
    const[userSchoolInfo, setUserSchoolInfo] = useState({});
    const[userSubjectInfo, setUserSubjectInfo] = useState({});

    useEffect(() => {
        const getUserData = async () => {
            await axios.post("http://localhost:3001/user-data",{
                withCredentials: true,
                username: username
            }).then((res) => {
                console.log(res);
                setUserSchoolInfo({
                    schoolName: res.data.schoolInfo.schoolName,
                    schoolID: res.data.schoolInfo.schoolID
                });
                setUserSubjectInfo(res.data.subjects);
            })
            .catch((err) => {
                console.log(err)
            })
        }
        getUserData();
    }, [])

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
                <div>
                {Object.keys(userSubjectInfo).map((key) => {
                    return (
                        <div>
                            {userSubjectInfo[key].SubjectName}
                        </div>
                    )
                })}
               
            </div>
            </div>
        </div>
    )
}

export default Home;