import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/config";
import { getUserData } from "../services/authService";
import { ROLE_HOME, isRole } from "../routes/roleHome";

const NotFound = () => {
    const navigate = useNavigate();

    // Logged-in users go to their own page, everyone else to Home
    const handleGoBack = async () => {
        const user = auth.currentUser;

        if (user?.emailVerified) {
            try {
                const userData =
                    await getUserData(user.uid);
                const role = userData?.role;

                if (isRole(role)) {
                    navigate(ROLE_HOME[role]);
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }

        navigate("/");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                py: 12,
                px: 3,
            }}
        >
            <Typography
                sx={{
                    fontWeight: 800,
                    fontSize: {
                        xs: "4rem",
                        md: "6rem",
                    },
                    color: "#1E3A8A",
                    lineHeight: 1,
                }}
            >
                404
            </Typography>

            <Typography
                sx={{
                    fontWeight: "bold",
                    fontSize: {
                        xs: "1.4rem",
                        md: "1.8rem",
                    },
                    mt: 2,
                    mb: 1,
                }}
            >
                Page not found
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 420 }}
            >
                The page you are looking for doesn&apos;t
                exist or has been moved.
            </Typography>

            <Button
                variant="contained"
                size="large"
                onClick={handleGoBack}
                sx={{
                    borderRadius: "12px",
                    px: 4,
                }}
            >
                Go Back
            </Button>
        </Box>
    );
};

export default NotFound;
