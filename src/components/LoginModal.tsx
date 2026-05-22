import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

import { loginUser, getUserData } from "../services/authService";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
}

const LoginModal = ({
    open,
    handleClose,
}: LoginModalProps) => {
    const navigate = useNavigate();
    const {
        showLoader,
        hideLoader,
    } = useLoader();
    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");
    const [errors, setErrors] = useState<any>({});

    const validateForm = () => {
        const newErrors: any = {};

        // Email
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
        ) {
            newErrors.email =
                "Enter valid email address";
        }

        // Password
        if (!password) {
            newErrors.password =
                "Password is required";
        } else if (password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const validateField = (
        field: string,
        value: string
    ) => {
        let error = "";

        switch (field) {
            case "email":
                if (!value.trim()) {
                    error = "Email is required";
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        value
                    )
                ) {
                    error =
                        "Enter valid email address";
                }
                break;

            case "password":
                if (!value) {
                    error = "Password is required";
                } else if (value.length < 6) {
                    error =
                        "Password must be at least 6 characters";
                }
                break;

            default:
                break;
        }

        setErrors((prev: any) => ({
            ...prev,
            [field]: error,
        }));
    };

    const handleLogin = async () => {
        showLoader();
        try {
            if (!validateForm()) return;

            const response = await loginUser(
                email,
                password
            );

            const user = response.user;

            const userData =
                await getUserData(user.uid);

            toast.success(
                "Login Successful"
            );

            handleClose();

            setEmail("");
            setPassword("");
            setErrors({});

            // Redirect based on role
            if (userData?.role === "tenant") {
                navigate("/properties");
            } else if (
                userData?.role === "owner"
            ) {
                navigate("/my-listings");
            }
        } catch (error: any) {
            if (
                error.code === "auth/user-not-found"
            ) {
                toast.error("User not found");
            } else if (
                error.code ===
                "auth/wrong-password"
            ) {
                toast.error(
                    "Incorrect password"
                );
            } else if (
                error.code ===
                "auth/invalid-credential"
            ) {
                toast.error(
                    "Invalid email or password"
                );
            } else {
                toast.error(error.message);
            }
        } finally {
            hideLoader();
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={{
                    width: "70vw",
                    height: "70vh",
                    bgcolor: "white",
                    borderRadius: "24px",
                    overflow: "hidden",
                    display: "flex",
                    mx: "auto",
                    mt: "10vh",
                }}
            >
                {/* Left Side */}
                {/* Left Side */}
                <Box
                    sx={{
                        width: "50%",

                        position:
                            "relative",

                        overflow:
                            "hidden",
                    }}
                >
                    {/* IMAGE */}
                    <Box
                        component="img"
                        src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600"
                        alt="homesphere"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit:
                                "cover",
                        }}
                    />

                    {/* OVERLAY */}
                    <Box
                        sx={{
                            position:
                                "absolute",

                            inset: 0,

                            background:
                                "linear-gradient(rgba(15,23,42,0.65), rgba(30,58,138,0.75))",

                            display: "flex",

                            flexDirection:
                                "column",

                            justifyContent:
                                "center",

                            alignItems:
                                "center",

                            color: "white",

                            p: 5,

                            textAlign:
                                "center",
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,

                                mb: 3,
                            }}
                        >
                            HomeSphere
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "20px",

                                maxWidth:
                                    "420px",

                                lineHeight: 1.8,

                                opacity: 0.95,
                            }}
                        >
                            Discover premium
                            rental properties,
                            connect with trusted
                            owners, and find
                            your perfect space
                            effortlessly.
                        </Typography>
                    </Box>
                </Box>

                {/* Right Side */}
                <Box
                    sx={{
                        width: "50%",
                        p: 5,
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            mb: 4,
                        }}
                    >
                        Login
                    </Typography>

                    <TextField
                        fullWidth
                        label="Email"
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{ mb: 3 }}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateField(
                                "email",
                                e.target.value
                            );
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{ mb: 4 }}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validateField(
                                "password",
                                e.target.value
                            );
                        }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleLogin}
                        sx={{
                            py: 1.5,
                            borderRadius: "12px",
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default LoginModal;