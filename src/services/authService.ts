import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
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

        // Send the verification link, then sign out so the account
        // can't be used until the email is verified. If sending fails,
        // the user can resend it from the login screen.
        let emailSent = true;

        try {
            await sendEmailVerification(
                userCredential.user
            );
        } catch {
            emailSent = false;
        } finally {
            await signOut(auth);
        }

        return emailSent;
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

export const EMAIL_NOT_VERIFIED =
    "auth/email-not-verified";

export const loginUser = async (
    email: string,
    password: string
) => {
    const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    // Unverified accounts are signed straight back out.
    if (!userCredential.user.emailVerified) {
        await signOut(auth);

        throw Object.assign(
            new Error("Email not verified"),
            { code: EMAIL_NOT_VERIFIED }
        );
    }

    return userCredential;
};

// Re-send the verification link. Firebase needs a signed-in user for
// this, so sign in briefly and sign out again.
export const resendVerificationEmail =
    async (
        email: string,
        password: string
    ) => {
        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        try {
            if (!userCredential.user.emailVerified) {
                await sendEmailVerification(
                    userCredential.user
                );
            }
        } finally {
            await signOut(auth);
        }

        return userCredential.user.emailVerified;
    };

export const logoutUser = async () => {
    return await signOut(auth);
};

// Send a password-reset email. Firebase hosts the reset page and handles the
// actual password change.
export const resetPassword = async (
    email: string
) => {
    return await sendPasswordResetEmail(
        auth,
        email
    );
};