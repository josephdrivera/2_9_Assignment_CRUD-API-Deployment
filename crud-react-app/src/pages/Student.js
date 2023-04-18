import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "../App.css";
import StudentProfile from "./StudentProfile";
import StudentForm from "./StudentForm";
import { useFetchStudent, useUpdateStudent, useDeleteStudent } from "../hooks/studentHooks";
import styles from "./Student.module.css";

function Student() {
    const { id } = useParams();
    const { student, loading, error } = useFetchStudent(id);
    const { updateStudent } = useUpdateStudent(id);
    const { deleteStudent } = useDeleteStudent(id);
    const navigate = useNavigate();

    const handleDelete = async () => {
        await deleteStudent();
        navigate("/dashboard", { replace: true });
    };

    const handleSubmit = async (values) => {
        await updateStudent(values);
        navigate("/dashboard", { replace: true });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Student Profile</h1>
            <StudentProfile student={student} />
            <button onClick={handleDelete}>Delete</button>
            <div className={styles.links}>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>
            <StudentForm onSubmit={handleSubmit} initialValues={student} />
        </div>
    );
}

export default Student;
