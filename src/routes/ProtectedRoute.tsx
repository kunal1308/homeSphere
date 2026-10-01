import { useEffect, useState } from "react";
import {
    Navigate,
    Outlet,
    useOutletContext,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Box, CircularProgress } from "@mui/material";

import { auth } from "../firebase/config";
import { getUserData } from "../services/authService";
import NotFound from "../pages/NotFound";
import { ROLE_HOME, isRole, type Role } from "./roleHome";

interface AuthState {
    // undefined = still checking, null = logged out
    role: string | null | undefined;
    // true only when the visitor was logged out on arrival
    // (not after logging out from this page)
    askLogin: boolean;
}

interface ProtectedRouteProps {
    role: Role;
}

const ProtectedRoute = ({
    role,
}: ProtectedRouteProps) => {
    // Forward MainLayout's context to the pages inside
    const context = useOutletContext();

    const [authState, setAuthState] =
        useState<AuthState>({
            role: undefined,
            askLogin: false,
        });

    useEffect(() => {
        let firstCheck = true;

        const unsubscribe =
            onAuthStateChanged(
                auth,
                async (user) => {
                    const isFirstCheck = firstCheck;
                    firstCheck = false;

                    // Unverified users count as logged out
                    if (!user?.emailVerified) {
                        setAuthState({
                            role: null,
                            askLogin: isFirstCheck,
                        });
                        return;
                    }

                    let userRole = "";
                    try {
                        const userData =
                            await getUserData(user.uid);
                        userRole = userData?.role ?? "";
                    } catch (error) {
                        console.log(error);
                    }

                    // Ignore the result if the user changed meanwhile
                    if (auth.currentUser?.uid !== user.uid) return;

                    setAuthState({
                        role: userRole,
                        askLogin: false,
                    });
                }
            );

        return () => unsubscribe();
    }, []);

    if (authState.role === undefined) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 10,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (authState.role === null) {
        return (
            <Navigate
                to="/"
                replace
                state={
                    authState.askLogin
                        ? { openLogin: true }
                        : undefined
                }
            />
        );
    }

    if (authState.role === role) {
        return <Outlet context={context} />;
    }

    // Logged in with the other role: send them to their own page
    if (isRole(authState.role)) {
        return (
            <Navigate
                to={ROLE_HOME[authState.role]}
                replace
            />
        );
    }

    // Logged in but no role on the profile
    return <NotFound />;
};

export default ProtectedRoute;
