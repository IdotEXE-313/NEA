import React from "react";
import NavigationBar from "../../components/navigation/navigationbar";
import styles from './contact.module.css';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";

const Contact = () => {

    const [message, setMessage] = useState(null);
    const[sendSuccess, setSendSuccess] = useState("Submit Message");

    const sendMessage = async() => {
        setSendSuccess("Message Sent");
        await axios.post("http://localhost:3001/send-text", {
            withCredentials: true,
            message: message
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
                <Button onClick={sendMessage}>{sendSuccess}</Button>
            </div>
            </div>
        </>
    )

}

export default Contact;