import React, {
    useState,
} from "react";

import {
    Box,
    Tabs,
    Tab,
    Typography,
    useTheme,
    useMediaQuery,
    Paper,
    Grid,
} from "@mui/material";

const tabLabels = [
    "Flats & Apartments",
    "Commercial Spaces",
    "PG Rentals",
];

const cities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Noida",
    "Gurgaon",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Indore",
    "Chandigarh",
    "Faridabad",
    "Ghaziabad",
    "Surat",
    "Patna",
];

const Sitemap = () => {
    const [activeTab, setActiveTab] =
        useState(0);

    const theme =
        useTheme();

    const isMobile =
        useMediaQuery(
            theme.breakpoints.down(
                "sm"
            )
        );

    const handleTabChange = (
        _event:
            React.SyntheticEvent,
        newValue: number
    ) => {
        setActiveTab(
            newValue
        );
    };

    return (
        <Box
            sx={{
                py: 6,

                px: {
                    xs: 2,
                    md: 6,
                },
            }}
        >
            {/* TOP */}
            <Typography
                variant="h2"
                align="center"
                sx={{
                    fontWeight: 800,

                    mb: 2,
                }}
            >
                Sitemap
            </Typography>

            <Typography
                align="center"
                sx={{
                    color: "#64748B",

                    maxWidth:
                        "750px",

                    mx: "auto",

                    mb: 5,

                    lineHeight: 1.8,
                }}
            >
                Explore rental
                properties across
                major cities and
                categories on
                HomeSphere.
            </Typography>

            {/* TABS */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "center",
                    mb: 5,
                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={
                        handleTabChange
                    }
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        "& .MuiTabs-flexContainer":
                        {
                            justifyContent:
                                "center",
                        },
                    }}
                >
                    {tabLabels.map(
                        (
                            label,
                            index
                        ) => (
                            <Tab
                                key={index}
                                label={label}
                            />
                        )
                    )}
                </Tabs>
            </Box>
            {/* POPULAR */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,

                        mb: 3,

                        textAlign:
                            "center",
                    }}
                >
                    Popular Cities
                </Typography>

                <Box
                    sx={{
                        display: "flex",

                        justifyContent:
                            "center",

                        flexWrap:
                            "wrap",

                        gap: 2,

                        py: 4,

                        px: 3,

                        borderRadius:
                            "20px",

                        bgcolor:
                            "rgba(30,58,138,0.05)",
                    }}
                >
                    {cities
                        .slice(0, 8)
                        .map(
                            (city) => (
                                <Paper
                                    key={city}
                                    elevation={0}
                                    sx={{
                                        px: 3,

                                        py: 1.2,

                                        borderRadius:
                                            "12px",

                                        border:
                                            "1px solid #CBD5E1",

                                        cursor:
                                            "pointer",

                                        fontWeight: 600,

                                        transition:
                                            "0.2s",

                                        "&:hover":
                                        {
                                            bgcolor:
                                                "#1E3A8A",

                                            color:
                                                "white",

                                            borderColor:
                                                "#1E3A8A",
                                        },
                                    }}
                                >
                                    {activeTab ===
                                        0
                                        ? `Flats in ${city}`
                                        : activeTab ===
                                            1
                                            ? `Commercial in ${city}`
                                            : `PG in ${city}`}
                                </Paper>
                            )
                        )}
                </Box>
            </Box>

            {/* ALL CITIES */}
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,

                    mb: 3,

                    textAlign:
                        "center",
                }}
            >
                All Cities
            </Typography>

            <Grid
                container
                spacing={2}
            >
                {cities.map(
                    (city) => (
                        <Grid
                            size={{
                                xs: 6,
                                sm: 4,
                                md: 2,
                            }}
                            key={city}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,

                                    borderRadius:
                                        "14px",

                                    border:
                                        "1px solid #E2E8F0",

                                    cursor:
                                        "pointer",

                                    transition:
                                        "0.2s",

                                    "&:hover":
                                    {
                                        bgcolor:
                                            "#1E3A8A",

                                        color:
                                            "white",

                                        transform:
                                            "translateY(-2px)",
                                    },
                                }}
                            >
                                <Typography
                                    sx={{ fontWeight: 500 }}
                                >
                                    {activeTab ===
                                        0
                                        ? `Flat in ${city}`
                                        : activeTab ===
                                            1
                                            ? `Commercial in ${city}`
                                            : `PG in ${city}`}
                                </Typography>
                            </Paper>
                        </Grid>
                    )
                )}
            </Grid>
        </Box>
    );
};

export default Sitemap;