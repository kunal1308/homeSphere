import {
    Box,
    Typography,
    Container,
    Card,
    Chip,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import {
    getTenantApplications,
} from "../services/propertyService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useLoader } from "../context/LoaderContext";

const MyApplications = () => {
    const [
        applications,
        setApplications,
    ] = useState<any[]>([]);

    const {
        showLoader,
        hideLoader
    } = useLoader();

    useEffect(() => {
        const unsubscribe =
            onAuthStateChanged(
                auth,
                (user) => {
                    if (user) {
                        fetchApplications();
                    }
                }
            );

        return () =>
            unsubscribe();
    }, []);

    const fetchApplications =
        async () => {
            showLoader();
            const data =
                await getTenantApplications();

            setApplications(data);
            hideLoader();
        };

    return (
        <Container
            maxWidth={false}
            sx={{
                py: 6,
                px: 6,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 4,
                }}
            >
                My Applications
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection:
                        "column",
                    gap: 3,
                }}
            >
                {applications?.length >
                    0 ? (
                    applications?.map(
                        (
                            application
                        ) => (
                            <Card
                                key={
                                    application?.id
                                }
                                sx={{
                                    p: 3,
                                    borderRadius:
                                        "20px",
                                    display:
                                        "flex",
                                    gap: 3,
                                    alignItems:
                                        "center",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={
                                        application?.propertyImage
                                    }
                                    sx={{
                                        width: 140,
                                        height: 100,
                                        objectFit:
                                            "cover",
                                        borderRadius:
                                            "16px",
                                    }}
                                />

                                <Box
                                    sx={{
                                        flex: 1,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                        }}
                                    >
                                        {
                                            application?.propertyTitle
                                        }
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        sx={{
                                            mt: 1,
                                        }}
                                    >
                                        {
                                            application?.propertyLocation
                                        }
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontWeight: 700,
                                            color:
                                                "#1E3A8A",
                                        }}
                                    >
                                        ₹{" "}
                                        {
                                            application?.propertyPrice
                                        }
                                    </Typography>
                                </Box>

                                <Chip
                                    label={
                                        application?.status
                                    }
                                    color={
                                        application?.status ===
                                            "approved"
                                            ? "success"
                                            : application?.status ===
                                                "rejected"
                                                ? "error"
                                                : "warning"
                                    }
                                />
                            </Card>
                        )
                    )
                ) : (
                    <Box
                        sx={{
                            height: "60vh",
                            width: "100%",
                            display: "flex",
                            flexDirection:
                                "column",
                            alignItems:
                                "center",
                            justifyContent:
                                "center",
                            textAlign:
                                "center",
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: "70px",
                                mb: 2,
                            }}
                        >
                            📄
                        </Box>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            No Applications Found
                        </Typography>

                        <Typography
                            sx={{
                                color:
                                    "#64748B",
                                maxWidth:
                                    "450px",
                                lineHeight: 1.8,
                                fontSize:
                                    "16px",
                            }}
                        >
                            You have not applied
                            for any properties
                            yet. Start exploring
                            and apply for your
                            perfect rental home.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default MyApplications;