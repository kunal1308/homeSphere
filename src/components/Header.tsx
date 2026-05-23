import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

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
    const [mobileOpen, setMobileOpen] = useState(false);

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

    const getDrawerItemStyles = (
        path: string
    ) => ({
        borderRadius: "8px",
        cursor: "pointer",

        mx: 1,
        my: 0.5,
        p: 0.6,
        fontWeight: location.pathname === path
            ? 600 : 400,

        color:
            location.pathname === path
                ? "#1E3A8A"
                : "black",

        "&:hover": {
            color:
                location.pathname === path
                    ? "#1E3A8A"
                    : "black",
        },
    });

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
                    justifyContent:
                        "space-between",
                    alignItems: "center",

                    minHeight: {
                        xs: "70px",
                        md: "80px",
                    },

                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },
                }}
            >
                {/* LEFT LOGO */}
                <Typography
                    sx={{
                        fontWeight: "bold",
                        color: "#1E3A8A",
                        cursor: "pointer",

                        fontSize: {
                            xs: "1.5rem",
                            md: "2rem",
                        },
                    }}
                >
                    HomeSphere
                </Typography>

                {/* DESKTOP MENU */}
                <Box
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex",
                        },

                        alignItems: "center",

                        gap: 3,
                    }}
                >
                    {userRole === "tenant" && (
                        <>
                            <Typography
                                sx={getDrawerItemStyles(
                                    "/properties"
                                )}
                                onClick={() => navigate('/properties')}
                            >
                                Properties
                            </Typography>

                            <Typography
                                sx={getDrawerItemStyles(
                                    "/my-applications"
                                )}
                                onClick={() =>
                                    navigate(
                                        "/my-applications"
                                    )
                                }
                            >
                                Applications
                            </Typography>
                        </>
                    )}

                    {userRole === "owner" && (
                        <>
                            <Typography
                                sx={getDrawerItemStyles(
                                    "/my-listings"
                                )}
                                onClick={() => navigate('/my-listings')}
                            >
                                My Listings
                            </Typography>

                            <Typography
                                sx={getDrawerItemStyles(
                                    "/applications"
                                )}
                                onClick={() =>
                                    navigate("/applications")
                                }
                            >
                                Applications
                            </Typography>
                        </>
                    )}
                </Box>

                {/* RIGHT SECTION */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    {/* DESKTOP AUTH */}
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },

                            gap: 2,
                        }}
                    >
                        {!isLoggedIn ? (
                            <>
                                <Button
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

                    {/* MOBILE MENU */}
                    <Box
                        sx={{
                            display: {
                                xs: "block",
                                md: "none",
                            },
                        }}
                    >
                        <IconButton
                            onClick={() =>
                                setMobileOpen(true)
                            }
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() =>
                    setMobileOpen(false)
                }
            >
                <Box sx={{ width: 250 }}>
                    <List>
                        {userRole === "tenant" && (
                            <>
                                <ListItemButton
                                    onClick={() => {
                                        navigate("/properties");
                                        setMobileOpen(false);
                                    }}
                                    sx={getDrawerItemStyles(
                                        "/properties"
                                    )}
                                >
                                    <ListItemText
                                        primary="Properties"
                                    />
                                </ListItemButton>

                                <ListItemButton
                                    onClick={() => {
                                        navigate(
                                            "/my-applications"
                                        );

                                        setMobileOpen(false);
                                    }}
                                    sx={getDrawerItemStyles(
                                        "/my-applications"
                                    )}
                                >
                                    <ListItemText
                                        primary="Applications"
                                    />
                                </ListItemButton>
                            </>
                        )}

                        {userRole === "owner" && (
                            <>
                                <ListItemButton
                                    onClick={() => {
                                        navigate(
                                            "/my-listings"
                                        );

                                        setMobileOpen(false);
                                    }}
                                    sx={getDrawerItemStyles(
                                        "/my-listings"
                                    )}
                                >
                                    <ListItemText
                                        primary="My Listings"
                                    />
                                </ListItemButton>

                                <ListItemButton
                                    onClick={() => {
                                        navigate(
                                            "/applications"
                                        );

                                        setMobileOpen(false);
                                    }}
                                    sx={getDrawerItemStyles(
                                        "/applications"
                                    )}
                                >
                                    <ListItemText
                                        primary="Applications"
                                    />
                                </ListItemButton>
                            </>
                        )}

                        <ListItemButton
                            onClick={() => {
                                if (isLoggedIn) {
                                    handleLogout();
                                } else {
                                    onLoginClick();
                                }

                                setMobileOpen(false);
                            }}
                        >
                            <ListItemText
                                primary={
                                    isLoggedIn
                                        ? "Logout"
                                        : "Login"
                                }
                            />
                        </ListItemButton>

                        {!isLoggedIn &&
                            <ListItemButton
                                onClick={() => {
                                    onSignupClick();
                                    setMobileOpen(false);
                                }}
                            >
                                <ListItemText
                                    primary={"Signup"}
                                />
                            </ListItemButton>
                        }
                    </List>
                </Box>
            </Drawer>
        </AppBar >
    );
};

export default Header;