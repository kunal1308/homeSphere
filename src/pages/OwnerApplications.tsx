import {
    Box,
    Typography,
    Container,
    Card,
    Chip,
    Button,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import {
    getOwnerApplications,
    updateApplicationStatus,
} from "../services/propertyService";

import {
    onAuthStateChanged,
} from "firebase/auth";

import { auth }
    from "../firebase/config";

import { toast }
    from "react-toastify";
import { useLoader } from "../context/LoaderContext";

const OwnerApplications =
    () => {
        const [applications, setApplications,] = useState<any[]>([]);
        const {
            showLoader,
            hideLoader
        } = useLoader();

        useEffect(() => {
            const unsubscribe =
                onAuthStateChanged(
                    auth,
                    (
                        user
                    ) => {
                        if (
                            user
                        ) {
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
                    await getOwnerApplications();

                setApplications(
                    data
                );
                hideLoader();
            };

        const handleStatus =
            async (
                applicationId: string,
                status:
                    | "approved"
                    | "rejected"
            ) => {
                await updateApplicationStatus(
                    applicationId,
                    status
                );

                toast.success(
                    `Application ${status}`
                );

                fetchApplications();
            };

        return (
            <Container
                maxWidth={
                    false
                }
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
                    Property
                    Applications
                </Typography>

                <Box
                    sx={{
                        display:
                            "flex",
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
                                        application.id
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
                                            sx={{
                                                mt: 1,
                                            }}
                                        >
                                            Tenant:{" "}
                                            {
                                                application?.tenantName
                                            }
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display:
                                                "flex",
                                            flexDirection:
                                                "column",
                                            gap: 2,
                                            alignItems:
                                                "flex-end",
                                        }}
                                    >
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

                                        {application?.status ===
                                            "pending" && (
                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() =>
                                                            handleStatus(
                                                                application.id,
                                                                "approved"
                                                            )
                                                        }
                                                    >
                                                        Approve
                                                    </Button>

                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() =>
                                                            handleStatus(
                                                                application.id,
                                                                "rejected"
                                                            )
                                                        }
                                                    >
                                                        Reject
                                                    </Button>
                                                </Box>
                                            )}
                                    </Box>
                                </Card>
                            )
                        )
                    ) : (
                        <Box
                            sx={{
                                height:
                                    "60vh",
                                display:
                                    "flex",
                                flexDirection:
                                    "column",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                }}
                            >
                                No Applications
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                No tenants have
                                applied yet.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Container>
        );
    };

export default OwnerApplications;