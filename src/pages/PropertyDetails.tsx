import {
    Box,
    Typography,
    Container,
    Button,
    Grid,
    Card,
    Chip,
} from "@mui/material";

import {
    LocationOn,
    Bed,
    Bathtub,
    Business,
    SquareFoot,
    DirectionsCar,
} from "@mui/icons-material";

import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    doc,
    getDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { useLoader } from "../context/LoaderContext";
import { applyForProperty } from "../services/propertyService";
import { toast } from "react-toastify";

const PropertyDetails = () => {
    const { id } = useParams();

    const [property, setProperty] = useState<any>(null);
    const [applying, setApplying] = useState(false);

    const {
        showLoader,
        hideLoader,
    } = useLoader();

    useEffect(() => {
        fetchProperty();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchProperty =
        async () => {
            showLoader();
            const docRef = doc(
                db,
                "properties",
                id as string
            );

            const snapshot =
                await getDoc(docRef);

            if (
                snapshot.exists()
            ) {
                setProperty({
                    id:
                        snapshot.id,

                    ...snapshot.data(),
                });
            }
            hideLoader();
        };

    const isCommercial =
        property?.domain ===
        "commercial";

    if (!property)
        return null;

    const handleApply =
        async () => {
            try {

                setApplying(true);

                await applyForProperty(
                    property
                );

                toast.success(
                    "Application submitted successfully"
                );
            } catch (error: any) {
                toast.error(
                    error.message
                );
            } finally {
                setApplying(false);
            }
        };

    return (
        <Container
            maxWidth={false}
            sx={{
                py: 4,
                px: {
                    xs: 2,
                    md: 6,
                },
            }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography
                    sx={{
                        fontSize: {
                            xs: "1.7rem",
                            md: "2.2rem",
                        },
                        fontWeight: 550,
                        mb: 1,
                    }}
                >
                    {property?.title}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "center",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                color: "#64748B",
                                fontSize: {
                                    xs: "14px",
                                    md: "18px",
                                },
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <LocationOn /> {property?.location}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                mt: 2,
                                flexWrap:
                                    "wrap",
                            }}
                        >
                            {!isCommercial && (
                                <>
                                    <Chip
                                        sx={{
                                            borderRadius: 2.5,
                                            fontSize: 14
                                        }}
                                        label={`${property?.bedrooms || 0
                                            } Bedrooms`}
                                    />

                                    <Chip
                                        sx={{
                                            borderRadius: 2.5,
                                            fontSize: 14
                                        }}
                                        label={`${property?.bathrooms || 0
                                            } Bathrooms`}
                                    />
                                </>
                            )}

                            {isCommercial && (
                                <>
                                    <Chip
                                        sx={{
                                            borderRadius: 2.5,
                                            fontSize: 14
                                        }}
                                        label={
                                            property?.commercialType ||
                                            "Commercial"
                                        }
                                    />

                                    <Chip
                                        sx={{
                                            borderRadius: 2.5,
                                            fontSize: 14
                                        }}
                                        label={`${property?.area || 0
                                            } sq.ft`}
                                    />
                                </>
                            )}
                        </Box>
                    </Box>

                    <Typography
                        sx={{
                            fontSize: {
                                xs: "1.7rem",
                                md: "2.2rem",
                            },
                            fontWeight: 550,
                            color: "#1E3A8A",
                        }}
                    >
                        ₹ {Number(
                            property?.price
                        )?.toLocaleString()} / month
                    </Typography>
                </Box>
            </Box>
            <Grid
                container
                spacing={2}
                sx={{ mb: 5 }}
            >
                <Grid
                    size={{
                        xs: 12,
                        md:
                            property?.images
                                ?.length > 1
                                ? 7
                                : 12,
                    }}
                >
                    <Box
                        component="img"
                        src={
                            property?.images?.[0]
                        }
                        sx={{
                            width: "100%",
                            height: {
                                xs: "250px",
                                sm: "350px",
                                md: "500px",
                            },
                            objectFit:
                                "cover",
                            borderRadius:
                                "24px",
                        }}
                    />
                </Grid>

                {property?.images
                    ?.length > 1 && (
                        <Grid
                            size={{
                                xs: 12,
                                md: 5,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "1fr 1fr",
                                    gap: 2,
                                }}
                            >
                                {property?.images
                                    ?.slice(1, 5)
                                    ?.map(
                                        (
                                            img: string,
                                            index: number
                                        ) => (
                                            <Box
                                                key={index}
                                                component="img"
                                                src={img}
                                                sx={{
                                                    width:
                                                        "100%",
                                                    height: {
                                                        xs: "180px",
                                                        md: "242px",
                                                    },
                                                    objectFit:
                                                        "cover",
                                                    borderRadius:
                                                        "20px",
                                                }}
                                            />
                                        )
                                    )}
                            </Box>
                        </Grid>
                    )}
            </Grid>

            <Grid container spacing={4}>
                {/* LEFT */}
                <Grid
                    size={{
                        xs: 12,
                        md: 8,
                    }}
                >
                    {/* OWNER DETAILS */}
                    <Card
                        sx={{
                            p: {
                                xs: 2.5,
                                md: 4,
                            },
                            borderRadius:
                                "20px",
                            mb: 4,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1.7rem",
                                    md: "2.2rem",
                                },
                                fontWeight: 700,
                                mb: 3,
                            }}
                        >
                            Owner Details
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius:
                                        "50%",
                                    bgcolor:
                                        "#1E3A8A",
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 22,
                                }}
                            >
                                {property?.ownerName
                                    ?.charAt(0)
                                    ?.toUpperCase() ||
                                    "O"}
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: 18,
                                    }}
                                >
                                    {property?.ownerName ||
                                        "Property Owner"}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                >
                                    Verified Owner
                                </Typography>
                            </Box>
                        </Box>
                    </Card>

                    {/* OVERVIEW */}
                    <Card
                        sx={{
                            p: {
                                xs: 2.5,
                                md: 4,
                            },
                            borderRadius:
                                "20px",
                            mb: 4,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1.7rem",
                                    md: "2.2rem",
                                },
                                fontWeight: 700,
                                mb: 3,
                            }}
                        >
                            Overview
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1.7rem",
                                    md: "2.2rem",
                                },
                                fontWeight: 550,
                                color:
                                    "#1E3A8A",
                                mb: 2,
                            }}
                        >
                            ₹ {Number(
                                property?.price
                            )?.toLocaleString()} / month
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1.7rem",
                                    md: "2.2rem",
                                },
                                fontWeight: 550,
                                mb: 2,
                            }}
                        >
                            {property?.title}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 1,
                            }}
                        >
                            <LocationOn
                                sx={{
                                    color:
                                        "#64748B",
                                }}
                            />

                            <Typography
                                color="text.secondary"
                            >
                                {
                                    property?.location
                                }
                            </Typography>
                        </Box>
                    </Card>

                    {/* PROPERTY DETAILS */}
                    <Card
                        sx={{
                            p: {
                                xs: 2.5,
                                md: 4,
                            },
                            borderRadius:
                                "20px",
                            mb: 4,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1.7rem",
                                    md: "2.2rem",
                                },
                                fontWeight: 700,
                                mb: 3,
                            }}
                        >
                            Property Details
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 3,
                                flexWrap:
                                    "wrap",
                            }}
                        >
                            {isCommercial ? (
                                <>
                                    <FeatureItem
                                        icon={
                                            <Business />
                                        }
                                        label={
                                            property?.commercialType ||
                                            "Office"
                                        }
                                    />

                                    <FeatureItem
                                        icon={
                                            <SquareFoot />
                                        }
                                        label={`${property?.area || 1200
                                            } sq.ft`}
                                    />

                                    <FeatureItem
                                        icon={
                                            <DirectionsCar />
                                        }
                                        label={
                                            property?.parking
                                                ? "Parking"
                                                : "No Parking"
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <FeatureItem
                                        icon={<Bed />}
                                        label={`${property?.bedrooms || 0
                                            } Bedrooms`}
                                    />

                                    <FeatureItem
                                        icon={
                                            <Bathtub />
                                        }
                                        label={`${property?.bathrooms || 0
                                            } Bathrooms`}
                                    />
                                </>
                            )}
                        </Box>
                    </Card>

                    {/* DESCRIPTION */}
                    <Card
                        sx={{
                            p: {
                                xs: 2.5,
                                md: 4,
                            },
                            borderRadius:
                                "20px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1.7rem",
                                    md: "2.2rem",
                                },
                                fontWeight: 700,
                                mb: 3,
                            }}
                        >
                            Description
                        </Typography>

                        <Typography
                            sx={{
                                color:
                                    "#475569",
                                lineHeight: 1.9,
                                fontSize:
                                    "16px",
                            }}
                        >
                            {property?.description ||
                                "No description added."}
                        </Typography>
                    </Card>
                </Grid >

                {/* RIGHT */}
                < Grid
                    size={{
                        xs: 12,
                        md: 4,
                    }}
                >
                    <Card
                        sx={{
                            p: {
                                xs: 2.5,
                                md: 4,
                            },

                            borderRadius:
                                "20px",

                            position:
                                "sticky",

                            top: "100px",

                            boxShadow: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "1.7rem",
                                    md: "2.2rem",
                                },
                                fontWeight: 700,

                                mb: 1,
                            }}
                        >
                            Property Owner
                        </Typography>

                        <Typography
                            sx={{
                                color:
                                    "#64748B",

                                mb: 4,
                            }}
                        >
                            Contact owner for
                            more details.
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={applying}
                            onClick={
                                handleApply
                            }
                            sx={{
                                py: 1.5,
                                borderRadius:
                                    "14px",
                            }}
                        >
                            {applying
                                ? "Applying..."
                                : "Apply For Rent"}
                        </Button>
                    </Card>
                </Grid >
            </Grid >
        </Container >
    );
};

const FeatureItem = ({
    icon,
    label,
}: any) => {
    return (
        <Box
            sx={{
                display: "flex",

                alignItems:
                    "center",

                gap: 1.2,

                bgcolor:
                    "#F8FAFC",

                px: 2,

                py: 1.5,

                borderRadius:
                    "12px",
            }}
        >
            {icon}

            <Typography
                sx={{
                    fontWeight: 500,
                }}
            >
                {label}
            </Typography>
        </Box>
    );
};

export default PropertyDetails;