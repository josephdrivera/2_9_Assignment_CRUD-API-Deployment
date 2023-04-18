import { useState, useEffect } from "react";

const API_BASE =
    process.env.NODE_ENV === "development"
        ? `http://localhost:8000/api/v1`
        : process.env.REACT_APP_BASE_URL;

export function useFetchStudents() {
    const [students, setStudents] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchStudents = async () => {
            setLoading(true);
            try {
                await fetch(`${API_BASE}/students`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (!ignore) setStudents(data);
                    });
            } catch (error) {
                setError(error.message || "Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();

        return () => {
            ignore = true;
        };
    }, []);

    return { students, loading, error };
}
