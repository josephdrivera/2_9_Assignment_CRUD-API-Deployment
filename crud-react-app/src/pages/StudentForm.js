import React, { useState, useEffect } from "react";
import styles from "./Student.module.css";

function StudentForm({ onSubmit, initialValues }) {
    const [values, setValues] = useState({ name: "", class: "" });

    useEffect(() => {
        if (initialValues) setValues(initialValues);
    }, [initialValues]);

    const handleInputChanges = (event) => {
        event.persist();
        setValues((prevValues) => ({ ...prevValues, [event.target.name]: event.target.value }));
    };

    return (
        <form
            className={styles.form}
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit(values);
            }}
        >
            <label className={styles.label}>
                Name:
                <input type="text" name="name" value={values.name} onChange={handleInputChanges} className={styles.input} />
            </label>
            <label className={styles.label}>
                Class:
                <input type="text" name="class" value={values.class} onChange={handleInputChanges} className={styles.input} />
            </label>
            <input type="submit" value="Submit" className={styles.submit} />
        </form>
    );
}

export default StudentForm;
