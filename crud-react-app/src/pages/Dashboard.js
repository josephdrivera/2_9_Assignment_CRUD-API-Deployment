import React from "react";
import { Link } from "react-router-dom";

import "../App.css";
import { useFetchStudents } from "../hooks/dashboardHooks";
import styles from "./Dashboard.module.css";

function Dashboard() {
    const { students, loading, error } = useFetchStudents();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>CRUD React App: Student</h1>
            <ul className={styles.studentsList}>
                {students &&
                    students.map((student, index) => (
                        <li key={student._id} className={styles.studentItem}>
                            <Link to={`/student/${student._id}`} className={styles.studentLink}>
                                {student.name}
                            </Link>
                        </li>
                    ))}
            </ul>
            <div className={styles.links}>
                <button className={styles.button} onClick={() => window.location.href = '/'}>
                    Home
                </button>
            </div>
        </div>

    );
}

export default Dashboard;
