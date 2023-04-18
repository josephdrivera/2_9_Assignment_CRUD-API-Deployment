import React from "react";
import styles from "./Student.module.css";

function StudentProfile({ student }) {
    return <h5 className={styles.profile}>{student && student.name}</h5>;
}

export default StudentProfile;
