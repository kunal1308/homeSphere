import {
    Box,
    Typography,
    Container,
    Pagination,
    Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
    useEffect,
    useState,
} from "react";

import PropertyCard from "../components/PropertyCard";

import {
    getMyProperties,
} from "../services/propertyService";
import AddPropertyModal from "../components/AddProperty/AddPropertyModal";
import { useLoader } from "../context/LoaderContext";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const MyListings = () => {
    const {
        showLoader,
        hideLoader,
    } = useLoader();
    const [properties, setProperties] =
        useState<any[]>([]);

    const [page, setPage] =
        useState(1);

    const [openAddModal, setOpenAddModal] =
        useState(false);

    const propertiesPerPage = 12;

    useEffect(() => {
        const unsubscribe =
            onAuthStateChanged(
                auth,
                (user) => {
                    if (user) {
                        fetchProperties();
                    }
                }
            );

        return () =>
            unsubscribe();
    }, []);

    const fetchProperties =
        async () => {
            try {
                showLoader();
                const data =
                    await getMyProperties();

                setProperties(data);
            } finally {
                hideLoader();
            }
        };

    const totalPages = Math.ceil(
        properties.length /
        propertiesPerPage
    );

    const startIndex =
        (page - 1) * propertiesPerPage;

    const paginatedProperties =
        properties.slice(
            startIndex,
            startIndex +
            propertiesPerPage
        );

    const handleCloseModal =
        async () => {
            setOpenAddModal(false);

            await fetchProperties();
        };

    return (
        <Container
            maxWidth={false}
            sx={{
                py: 6,
                px: 6,
            }}
        >
            {/* Top Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    mb: 4,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                    }}
                >
                    My Properties
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() =>
                        setOpenAddModal(true)
                    }
                >
                    Add Property
                </Button>
            </Box>

            {/* Property Cards */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4,
                    justifyContent:
                        "flex-start",
                }}
            >
                {/* Property Cards */}
                {paginatedProperties?.length >
                    0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 4,
                            justifyContent:
                                "flex-start",
                        }}
                    >
                        {paginatedProperties?.map(
                            (property) => (
                                <Box
                                    key={property?.id}
                                    sx={{
                                        width: "350px",
                                    }}
                                >
                                    <PropertyCard
                                        property={
                                            property
                                        }
                                        isOwner
                                    />
                                </Box>
                            )
                        )}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            height: "60vh",
                            width: '100%',
                            display: "flex",
                            flexDirection:
                                "column",
                            alignItems: "center",
                            justifyContent:
                                "center",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",

                                color: "#1E293B",

                                mb: 2,
                            }}
                        >
                            No Listings Yet
                        </Typography>

                        <Typography
                            sx={{
                                color: "#64748B",

                                mb: 4,

                                fontSize: "16px",
                            }}
                        >
                            Start by adding your
                            first property listing.
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() =>
                                setOpenAddModal(
                                    true
                                )
                            }
                            sx={{
                                borderRadius:
                                    "12px",

                                px: 4,

                                py: 1.2,
                            }}
                        >
                            Add Property
                        </Button>
                    </Box>
                )}
            </Box>

            {/* Pagination */}
            {properties?.length > 0 &&
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 6,
                    }}
                >
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) =>
                            setPage(value)
                        }
                        color="primary"
                        shape="rounded"
                    />
                </Box>
            }
            <AddPropertyModal
                open={openAddModal}
                handleClose={handleCloseModal}
            />
        </Container>
    );
};

export default MyListings;