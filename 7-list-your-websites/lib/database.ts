import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";

export const addDocument = async (uid: string, data: {}) => {
    try {
        await setDoc(
            doc(db, "users", uid),
            {
                uid,
                ...data,
            },
            { merge: true }
        );
    } catch (err) {
        console.log(err);
    }
};

export const addSite = async (uid: string, data: {}) => {
    try {
        await updateDoc(doc(db, "users", uid), {
            sites: arrayUnion({
                ...data,
                createdAt: new Date().toISOString(),
            }),
        });
    } catch (err) {
        console.log(err);
    }
};
