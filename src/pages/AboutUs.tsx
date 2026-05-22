import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
} from "@mui/material";

const aboutSections = [
    {
        title: "Who We Are",

        description:
            "HomeSphere is a modern rental platform connecting tenants and property owners through seamless digital experiences.",
    },

    {
        title: "Our Mission",

        description:
            "We aim to simplify property rentals with verified listings, transparent communication, and intuitive management tools.",
    },

    {
        title: "Why Choose Us",

        description:
            "From residential homes to commercial spaces, HomeSphere delivers secure and modern rental experiences.",
    },

    {
        title: "Our Vision",

        description:
            "To become the most trusted digital ecosystem for smart rental property management.",
    },
];

const AboutUs = () => {
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
                    About Us
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
                    Discover how
                    HomeSphere is
                    transforming modern
                    property rental
                    experiences for
                    tenants and owners.
                </Typography>
            </Box>

            {/* GRID */}
            <Grid
                container
                spacing={4}
            >
                {aboutSections.map(
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

export default AboutUs;