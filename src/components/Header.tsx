import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material";

import { useEffect, useState } from "react";

import { auth } from "../firebase/config";

import { getUserData } from "../services/authService";

import {
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";


interface HeaderProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
}
export const handleProtectedNavigation =
    () => {
        if (
            !auth.currentUser
        ) {
            document
                .getElementById(
                    "header-login-btn"
                )
                ?.click();
        }
    };

const Header = ({
    onLoginClick,
    onSignupClick,
}: HeaderProps) => {
    const navigate = useNavigate();
    const {
        showLoader,
        hideLoader,
    } = useLoader();

    const [userRole, setUserRole] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe =
            onAuthStateChanged(
                auth,
                async (user) => {
                    if (user) {
                        setIsLoggedIn(true);

                        const userData =
                            await getUserData(
                                user.uid
                            );

                        if (userData?.role) {
                            setUserRole(
                                userData.role
                            );
                        }
                    } else {
                        setIsLoggedIn(false);
                        setUserRole("");
                    }
                }
            );

        return () => unsubscribe();
    }, []);

    const handleLogout =
        async () => {
            try {
                showLoader();

                await signOut(auth);

                setIsLoggedIn(false);

                setUserRole("");

                toast.success(
                    "User logged out successfully!"
                );

                navigate("/");
            } catch (error) {
                console.log(error);
            } finally {
                setTimeout(() => {
                    hideLoader();
                }, 500);
            }
        };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "white",
                borderBottom: "1px solid #E2E8F0",
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: "80px",
                    px: 4,
                }}
            >
                {/* LEFT - Logo */}
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            color: "#1E3A8A",
                            cursor: "pointer",
                        }}
                    >
                        HomeSphere
                    </Typography>
                </Box>

                {/* CENTER - Menu */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {userRole === "tenant" && (
                        <Box sx={{ display: 'flex', gap: '1.5rem' }}>
                            <Typography
                                sx={{
                                    cursor: "pointer",
                                    fontWeight: 550,
                                    bgcolor:
                                        location.pathname ===
                                            "/properties"
                                            ? "#1E3A8A"
                                            : "transparent",

                                    color:
                                        location.pathname ===
                                            "/properties"
                                            ? "white"
                                            : "#0F172A",

                                    borderRadius:
                                        "10px",

                                    px: 2,

                                    "&:hover": {
                                        bgcolor:
                                            location.pathname ===
                                                "/properties"
                                                ? "#1E3A8A"
                                                : "#F1F5F9",
                                    },
                                }}
                                onClick={() => navigate('/properties')}
                            >
                                Properties
                            </Typography>
                            <Typography
                                sx={{
                                    cursor: "pointer",
                                    fontWeight: 550,
                                    bgcolor:
                                        location.pathname ===
                                            "/my-applications"
                                            ? "#1E3A8A"
                                            : "transparent",

                                    color:
                                        location.pathname ===
                                            "/my-applications"
                                            ? "white"
                                            : "#0F172A",

                                    borderRadius:
                                        "10px",

                                    px: 2,

                                    "&:hover": {
                                        bgcolor:
                                            location.pathname ===
                                                "/my-applications"
                                                ? "#1E3A8A"
                                                : "#F1F5F9",
                                    },
                                }}
                                onClick={() =>
                                    navigate(
                                        "/my-applications"
                                    )
                                }
                            >
                                Applications
                            </Typography>
                        </Box>
                    )}

                    {userRole === "owner" && (
                        <Box sx={{ display: 'flex', gap: '1.5rem' }}>
                            <Typography
                                sx={{
                                    cursor: "pointer",
                                    fontWeight: 550,
                                    bgcolor:
                                        location.pathname ===
                                            "/my-listings"
                                            ? "#1E3A8A"
                                            : "transparent",

                                    color:
                                        location.pathname ===
                                            "/my-listings"
                                            ? "white"
                                            : "#0F172A",

                                    borderRadius:
                                        "10px",

                                    px: 2,

                                    "&:hover": {
                                        bgcolor:
                                            location.pathname ===
                                                "/my-listings"
                                                ? "#1E3A8A"
                                                : "#F1F5F9",
                                    },
                                }}
                                onClick={() => navigate('/my-listings')}
                            >
                                My Listings
                            </Typography>
                            <Typography
                                sx={{
                                    cursor: "pointer",
                                    fontWeight: 550,
                                    bgcolor:
                                        location.pathname ===
                                            "/applications"
                                            ? "#1E3A8A"
                                            : "transparent",

                                    color:
                                        location.pathname ===
                                            "/applications"
                                            ? "white"
                                            : "#0F172A",

                                    borderRadius:
                                        "10px",

                                    px: 2,

                                    "&:hover": {
                                        bgcolor:
                                            location.pathname ===
                                                "/applications"
                                                ? "#1E3A8A"
                                                : "#F1F5F9",
                                    },
                                }}
                                onClick={() =>
                                    navigate(
                                        "/applications"
                                    )
                                }
                            >
                                Applications
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* RIGHT - Auth Buttons */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                    }}
                >
                    {!isLoggedIn ? (
                        <>
                            <Button
                                id="header-login-btn"
                                variant="outlined"
                                onClick={onLoginClick}
                            >
                                Login
                            </Button>

                            <Button
                                variant="contained"
                                onClick={onSignupClick}
                            >
                                Signup
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;