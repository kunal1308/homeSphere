import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

import { loginUser, getUserData, resetPassword } from "../services/authService";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
    const [showPassword, setShowPassword] = useState<boolean>(false);

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

    const handleModalClose = () => {
        setShowPassword(false);
        setErrors({});
        handleClose();
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

    const handleForgotPassword =
        async () => {
            // Only the email is needed to send a reset link.
            if (!email.trim()) {
                setErrors((prev: any) => ({
                    ...prev,
                    email: "Enter your email to reset password",
                }));
                return;
            }
            if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
            ) {
                setErrors((prev: any) => ({
                    ...prev,
                    email: "Enter valid email address",
                }));
                return;
            }

            showLoader();
            try {
                await resetPassword(email);
                toast.success(
                    "Password reset link sent to your email"
                );
            } catch (error: any) {
                if (
                    error.code === "auth/user-not-found"
                ) {
                    toast.error("User not found");
                } else {
                    toast.error(error.message);
                }
            } finally {
                hideLoader();
            }
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

            handleModalClose();

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: {
                        xs: "95%",
                        sm: "85%",
                        md: "70vw",
                    },

                    height: {
                        xs: "auto",
                        md: "70vh",
                    },

                    maxHeight: "95vh",

                    display: "flex",

                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },

                    overflowY: "auto",
                    bgcolor: "white",
                    borderRadius: "24px",
                    overflow: "hidden",
                    mx: "auto",
                    mt: {
                        xs: "3vh",
                        lg: "10vh"
                    },
                }}
            >
                {/* Left Side */}
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            md: "50%",
                        },

                        height: {
                            xs: "220px",
                            md: "100%",
                        },

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
                            sx={{
                                fontWeight: 800,
                                fontSize: {
                                    xs: "2rem",
                                    md: "3.5rem",
                                },
                                mb: 3,
                            }}
                        >
                            HomeSphere
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "14px",
                                    md: "20px",
                                },

                                maxWidth: "420px",

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
                        width: {
                            xs: "100%",
                            md: "50%",
                        },

                        p: {
                            xs: 3,
                            sm: 4,
                            md: 5,
                        },
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <IconButton
                        onClick={handleModalClose}
                        sx={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography
                        sx={{
                            fontWeight: "bold",
                            mb: 4,
                            fontSize: {
                                xs: "1.8rem",
                                md: "2.2rem",
                            },
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
                        type={showPassword ? "text" : "password"}
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
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            edge="end"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: -2,
                            mb: 3,
                        }}
                    >
                        <Button
                            variant="text"
                            size="small"
                            onClick={handleForgotPassword}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            Forgot password?
                        </Button>
                    </Box>

                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
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