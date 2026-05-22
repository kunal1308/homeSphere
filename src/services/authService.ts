import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";

import { auth, db } from "../firebase/config";
import {
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

export const registerUser =
    async (
        name: string,
        email: string,
        password: string,
        role: string
    ) => {
        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        await updateProfile(
            userCredential.user,
            {
                displayName:
                    name,
            }
        );

        await setDoc(
            doc(
                db,
                "users",
                userCredential.user.uid
            ),
            {
                uid:
                    userCredential.user.uid,

                name,

                email,

                role,
            }
        );

        return userCredential.user;
    };

export const getUserData = async (
    uid: string
) => {
    const docRef = doc(db, "users", uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }

    return null;
};

export const loginUser = async (
    email: string,
    password: string
) => {
    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
};

export const logoutUser = async () => {
    return await signOut(auth);
};