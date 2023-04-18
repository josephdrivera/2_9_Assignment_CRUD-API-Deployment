import React from "react";
import { Link } from "react-router-dom";

import "../App.css";
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>CRUD React App: Students List</h1>
            <div className={styles.links}>
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </div>
    );
}

export default Home;
