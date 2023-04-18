import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const API_BASE =
    process.env.NODE_ENV === "development"
        ? `http://localhost:8000/api/v1`
        : process.env.REACT_APP_BASE_URL;

export function useFetchStudent(id) {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchStudent = async () => {
            setLoading(true);
            try {
                await fetch(`${API_BASE}/student/${id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (!ignore) setStudent(data);
                    });
            } catch (error) {
                setError(error.message || "Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();

        return () => {
            ignore = true;
        };
    }, [id]);

    return { student, loading, error };
}

export function useUpdateStudent(id) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateStudent = async (values) => {
        setLoading(true);
        try {
            await fetch(`${API_BASE}/student/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
        } catch (error) {
            setError(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return { updateStudent, loading, error };
}

export function useDeleteStudent(id) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteStudent = async () => {
        setLoading(true);
        try {
            await fetch(`${API_BASE}/student/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            setError(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return { deleteStudent, loading, error };
}
