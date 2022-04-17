import type { NextApiRequest, NextApiResponse } from "next";
// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "lib/firebase";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data: any = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        res.status(200).send(data);
    } else {
        res.status(400).json({
            message: "You are not allowed to use this method.",
        });
    }
}
