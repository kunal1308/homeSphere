import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
} from "@mui/material";

const policySections = [
    {
        title:
            "Information Collection",

        description:
            "We collect essential information required for account creation, property listings, and rental applications.",
    },

    {
        title: "Data Security",

        description:
            "Your personal and property information is securely stored using modern authentication and database protection systems.",
    },

    {
        title:
            "Third-Party Services",

        description:
            "HomeSphere may integrate trusted third-party tools for analytics, storage, and authentication services.",
    },

    {
        title: "User Privacy",

        description:
            "We respect your privacy and never sell personal information to unauthorized parties.",
    },
];

const PrivacyPolicy = () => {
    return (
        <Container
            maxWidth={false}
            sx={{
                py: 8,

                px: {
                    xs: 3,
                    md: 6,
                },
            }}
        >
            {/* TOP */}
            <Box
                sx={{
                    textAlign:
                        "center",

                    mb: 8,
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 800,

                        mb: 2,
                    }}
                >
                    Privacy Policy
                </Typography>

                <Typography
                    sx={{
                        maxWidth:
                            "800px",

                        mx: "auto",

                        color:
                            "#64748B",

                        lineHeight: 1.8,

                        fontSize:
                            "18px",
                    }}
                >
                    Learn how HomeSphere
                    protects your
                    personal information
                    and ensures secure
                    rental experiences.
                </Typography>
            </Box>

            {/* GRID */}
            <Grid
                container
                spacing={4}
            >
                {policySections.map(
                    (section) => (
                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                            key={
                                section.title
                            }
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 5,

                                    borderRadius:
                                        "24px",

                                    border:
                                        "1px solid #E2E8F0",

                                    height:
                                        "100%",

                                    transition:
                                        "0.2s",

                                    "&:hover":
                                    {
                                        transform:
                                            "translateY(-4px)",

                                        boxShadow: 3,
                                    },
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,

                                        mb: 3,

                                        color:
                                            "#1E3A8A",
                                    }}
                                >
                                    {
                                        section.title
                                    }
                                </Typography>

                                <Typography
                                    sx={{
                                        color:
                                            "#64748B",

                                        lineHeight: 1.9,

                                        fontSize:
                                            "16px",
                                    }}
                                >
                                    {
                                        section.description
                                    }
                                </Typography>
                            </Paper>
                        </Grid>
                    )
                )}
            </Grid>
        </Container>
    );
};

export default PrivacyPolicy;