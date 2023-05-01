import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "../App.css";
import styles from "./Home.module.css";

function SingUp() {
    const [email, setCurrentUser] = useState(false);
    const [password, setPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const user = false;
            if (user) {
                setCurrentUser(user);
            }
            navigate("/dashboard");
        }
        catch (error) {
            console.log(error);
        }

    };


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>CRUD React App: Students List</h1>
            <div className={styles.links}>
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </div>
    );
}

export default SingUp;
