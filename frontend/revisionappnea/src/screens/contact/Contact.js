import React from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import styles from './contact.module.css';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";

const Contact = () => {

    const [message, setMessage] = useState(null);
    const[sendSuccess, setSendSuccess] = useState("Submit Message");
    const[lengthWarning, setLengthWarning] = useState("");

    const sendMessage = async() => {
        await axios.post("http://localhost:3001/send-text", {
            withCredentials: true,
            message: message
        })
        .then((res) => {
            if(res.data.isSent){
                setSendSuccess("Message Sent"); //changes the button's text's state if the message is sent 
            }
            else{
                setLengthWarning("Message must be between 20 and 160 characters long"); //changes the error message's state if the message sending fails
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <NavigationBar />
            <div className={styles.content}>
            <div className={styles.title}>
                <h1>Contact Me</h1>
                <p>Use this page to request new features, report bugs, or anything else (e.g. adding a new subject)</p>
            </div>
            <div>
                <form className={styles.textBox}>
                    <textarea className={styles.input} onChange={(e) => setMessage(e.target.value)}></textarea>
                </form>
                <div className={styles.lengthWarning}>
                    {lengthWarning}
                </div>
                <Button onClick={sendMessage}>{sendSuccess}</Button>
            </div>
            </div>
        </>
    )

}

export default Contact;