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

    useEffect(() => {
        window.scrollTo(0, 0);
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
                px: {
                    xs: 2,
                    sm: 3,
                    md: 6,
                },
            }}
        >
            <Typography
                sx={{
                    fontWeight: 700,
                    mb: 4,
                    fontSize: {
                        xs: "1.8rem",
                        md: "2.4rem",
                    },
                }}
            >
                My Applications
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
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
                                    borderRadius: "20px",
                                    display: "flex",

                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },

                                    gap: 3,

                                    alignItems: {
                                        xs: "flex-start",
                                        sm: "center",
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    alt={application?.propertyName || "Property image"}
                                    src={
                                        application?.propertyImage
                                    }
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: 140,
                                        },

                                        height: {
                                            xs: 220,
                                            sm: 100,
                                        },
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
                                    sx={{
                                        alignSelf: {
                                            xs: "flex-start",
                                            sm: "center",
                                        },
                                    }}
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
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                fontSize: {
                                    xs: "1.8rem",
                                    md: "2.2rem",
                                },
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
                                fontSize: {
                                    xs: "14px",
                                    md: "16px",
                                },
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