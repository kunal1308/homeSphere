import {
    Box,
    Typography,
    Container,
    Pagination
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import PropertyCard from "../components/PropertyCard";

import {
    getProperties,
} from "../services/propertyService";
import { useLoader } from "../context/LoaderContext";

const Properties = () => {
    const {
        showLoader,
        hideLoader,
    } = useLoader();
    const [properties, setProperties] =
        useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [selectedDomain, setSelectedDomain] = useState("all");

    const propertiesPerPage = 12;

    const filteredProperties =
        selectedDomain ===
            "all"
            ? properties
            : properties?.filter(
                (property) =>
                    property?.domain ===
                    selectedDomain
            );

    const totalPages = Math.ceil(
        filteredProperties.length /
        propertiesPerPage
    );

    const startIndex =
        (page - 1) * propertiesPerPage;

    const paginatedProperties =
        filteredProperties?.slice(
            startIndex,
            startIndex +
            propertiesPerPage
        );

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        showLoader();
        const data =
            await getProperties();

        setProperties(data);
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
                    fontWeight: "bold",
                    mb: 4,
                    fontSize: {
                        xs: "1.8rem",
                        sm: "2.2rem",
                        md: "2.6rem",
                    },
                }}
            >
                Available Properties
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 4,
                    flexWrap: "wrap",
                    justifyContent: {
                        xs: "flex-start",
                    },
                }}
            >
                {[
                    {
                        label: "All",
                        value: "all",
                    },
                    {
                        label: "Residential",
                        value:
                            "residential",
                    },
                    {
                        label: "Commercial",
                        value:
                            "commercial",
                    },
                ].map((item) => (
                    <Box
                        key={item.value}
                        onClick={() => {
                            setSelectedDomain(
                                item.value
                            );

                            setPage(1);
                        }}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius:
                                "999px",
                            cursor: "pointer",
                            transition:
                                "0.2s",

                            bgcolor:
                                selectedDomain ===
                                    item.value
                                    ? "#1E3A8A"
                                    : "#F1F5F9",

                            color:
                                selectedDomain ===
                                    item.value
                                    ? "white"
                                    : "#0F172A",

                            fontWeight: 600,

                            "&:hover": {
                                opacity: 0.9,
                            },
                        }}
                    >
                        {item.label}
                    </Box>
                ))}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4,
                    justifyContent: {
                        xs: "center",
                        md: "flex-start",
                    },
                }}
            >
                {paginatedProperties?.length > 0 ?
                    paginatedProperties?.map(
                        (property) => (
                            <Box
                                key={property?.id}
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "320px",
                                        lg: "330px",
                                    },
                                }}
                            >
                                <PropertyCard
                                    property={property}
                                />
                            </Box>
                        )) : (
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
                                No Properties found!
                            </Typography>
                        </Box>
                    )}
            </Box>
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
        </Container>
    );
};

export default Properties;