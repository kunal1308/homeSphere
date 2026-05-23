import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Card,
    CardActionArea,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

import { registerUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";

interface SignupModalProps {
    open: boolean;
    handleClose: () => void;
}

const SignupModal = ({
    open,
    handleClose,
}: SignupModalProps) => {
    const navigate = useNavigate();
    const {
        showLoader,
        hideLoader,
    } = useLoader();
    const [name, setName] = useState("");
    const [email, setEmail] =
        useState("");
    const [password, setPassword] =
        useState("");
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState<any>({});


    const validateForm = () => {
        const newErrors: any = {};

        // Name
        if (!name.trim()) {
            newErrors.name = "Full name is required";
        }

        // Email
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
        ) {
            newErrors.email = "Enter valid email address";
        }

        // Password
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        // Role
        if (!role) {
            newErrors.role = "Please select role";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {
        showLoader();
        try {
            if (!validateForm()) return;

            await registerUser(
                name,
                email,
                password,
                role
            );

            toast.success("Signup Successful");

            if (role === "tenant") {
                navigate("/properties");
            } else {
                navigate("/my-listings");
            }

            handleClose();

            // Reset fields
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
            setErrors({});
        } catch (error: any) {
            if (
                error.code === "auth/email-already-in-use"
            ) {
                toast.error("Email already exists");
            } else if (
                error.code === "auth/invalid-email"
            ) {
                toast.error("Invalid email address");
            } else if (
                error.code === "auth/weak-password"
            ) {
                toast.error(
                    "Password should be at least 6 characters"
                );
            } else {
                toast.error(error.message);
            }
        } finally {
            hideLoader();
        }
    };

    const validateField = (
        field: string,
        value: string
    ) => {
        let error = "";

        switch (field) {
            case "name":
                if (!value.trim()) {
                    error = "Full name is required";
                }
                break;

            case "email":
                if (!value.trim()) {
                    error = "Email is required";
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        value
                    )
                ) {
                    error = "Enter valid email address";
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

            case "role":
                if (!value) {
                    error = "Please select role";
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

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={{
                    width: {
                        xs: "95%",
                        sm: "85%",
                        md: "70vw",
                    },

                    height: {
                        xs: "auto",
                        md: "80vh",
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
                    mx: "auto",
                    mt: {
                        xs: "1vh",
                        md: "10vh",
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
                            xs: "260px",
                            sm: "300px",
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
                        src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600"
                        alt="homesphere-signup"
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
                                "linear-gradient(rgba(15,23,42,0.7), rgba(30,58,138,0.8))",

                            display: "flex",

                            flexDirection:
                                "column",

                            justifyContent:
                                "center",

                            alignItems:
                                "center",

                            color: "white",

                            p: {
                                xs: 2,
                                md: 5,
                            },

                            textAlign:
                                "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 800,
                                fontSize: {
                                    xs: "1.5rem",
                                    sm: "2rem",
                                    md: "3.5rem",
                                },
                                mb: 3,
                            }}
                        >
                            Join HomeSphere
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
                            Create your account,
                            explore premium
                            rental properties,
                            and connect with
                            trusted property
                            owners seamlessly.
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
                        justifyContent: "flex-start",
                        overflowY: "auto",
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
                        sx={{
                            fontWeight: "bold",
                            mb: 4,
                            fontSize: {
                                xs: "1.8rem",
                                md: "2.2rem",
                            },
                        }}
                    >
                        Signup
                    </Typography>

                    {/* Role Selection */}
                    <Typography
                        sx={{
                            mb: 2,
                            fontWeight: "bold",
                        }}
                    >
                        Select Role
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",

                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },

                            gap: 2,
                            mb: {
                                xs: 3,
                                md: 4,
                            },
                        }}
                    >
                        {/* Owner */}
                        <Card
                            sx={{
                                flex: 1,
                                border:
                                    role === "owner"
                                        ? "2px solid #1E3A8A"
                                        : "1px solid #CBD5E1",
                                borderRadius: "16px",
                            }}
                        >
                            <CardActionArea
                                onClick={() => {
                                    setRole("owner");
                                    validateField("role", "owner");
                                }}
                                sx={{ height: '100%' }}
                            >
                                <Box sx={{ p: 2 }}>
                                    <Typography
                                        sx={{
                                            fontWeight: "bold",
                                            mb: 1,
                                        }}
                                    >
                                        Property Owner
                                    </Typography>

                                    <Typography variant="body2">
                                        List and manage rental
                                        properties.
                                    </Typography>
                                </Box>
                            </CardActionArea>
                        </Card>

                        {/* Tenant */}
                        <Card
                            sx={{
                                flex: 1,
                                border:
                                    role === "tenant"
                                        ? "2px solid #1E3A8A"
                                        : "1px solid #CBD5E1",
                                borderRadius: "16px",
                            }}
                        >
                            <CardActionArea
                                onClick={() => {
                                    setRole("tenant");
                                    validateField("role", "tenant");
                                }}
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <Box sx={{ p: 2 }}>
                                    <Typography
                                        sx={{
                                            fontWeight: "bold",
                                            mb: 1,
                                        }}
                                    >
                                        Tenant
                                    </Typography>

                                    <Typography variant="body2">
                                        Find and rent homes easily.
                                    </Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Box>

                    {errors.role && (
                        <Typography
                            color="error"
                            variant="body2"
                            sx={{ mb: 2 }}
                        >
                            {errors.role}
                        </Typography>
                    )}

                    <TextField
                        fullWidth
                        label="Full Name"
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{ mb: 3 }}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            validateField("name", e.target.value);
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{ mb: 3 }}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateField("email", e.target.value);
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
                        fullWidth
                        onClick={handleSignup}
                        sx={{
                            py: 1.5,
                            borderRadius: "12px",
                        }}
                    >
                        Create Account
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default SignupModal;