import { useEffect, useState } from "react";
// Firebase
import {
    getAuth,
    GithubAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { app } from "lib/firebase";
import { addDocument } from "lib/database";
// Context
import { useAuth } from "context/AuthContext";

export default function useAuthFirebase(submit: boolean, logout: boolean) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { setUser, user } = useAuth();

    const provider = new GithubAuthProvider();
    const auth = getAuth(app);

    useEffect(() => {
        if (submit && !user?.currentUser) {
            setLoading(true);
            signInWithPopup(auth, provider)
                .then(() => {
                    const data = {
                        name: auth?.currentUser?.displayName,
                        email: auth?.currentUser?.email,
                        photoUrl: auth?.currentUser?.photoURL,
                    };
                    setUser(auth);
                    addDocument(auth?.currentUser?.uid!, data);
                    setError("");
                })
                .catch((err) => {
                    setError("Something went wrong.");
                })
                .finally(() => setLoading(false));
        }

        if (logout)
            signOut(auth).then(() => {
                setUser(null);
            });
    }, [submit, logout]);

    return {
        loading,
        error,
    };
}
