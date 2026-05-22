import {
    Box,
    Container,
    Typography,
    Link,
} from "@mui/material";

import {
    Facebook,
    Instagram,
    LinkedIn,
    Twitter,
} from "@mui/icons-material";
import {
    Link as RouterLink,
} from "react-router-dom";

const Footer = () => {
    return (
        <Box
            sx={{
                bgcolor: "#0F172A",

                color: "white",

                pt: 8,

                pb: 4,

                mt: 10,
            }}
        >
            <Container
                maxWidth={false}
            >
                {/* TOP */}
                <Box
                    sx={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        flexWrap: "wrap",

                        gap: 6,

                        pb: 6,

                        borderBottom:
                            "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    {/* BRAND */}
                    <Box
                        sx={{
                            maxWidth:
                                "350px",
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,

                                mb: 2,
                            }}
                        >
                            HomeSphere
                        </Typography>

                        <Typography
                            sx={{
                                color:
                                    "rgba(255,255,255,0.75)",

                                lineHeight: 1.8,
                            }}
                        >
                            A modern property
                            rental platform for
                            tenants and owners
                            to discover, manage,
                            and rent properties
                            seamlessly.
                        </Typography>

                        {/* SOCIALS */}
                        <Box
                            sx={{
                                display: "flex",

                                gap: 2,

                                mt: 3,
                            }}
                        >
                            <SocialIcon>
                                <Facebook />
                            </SocialIcon>

                            <SocialIcon>
                                <Instagram />
                            </SocialIcon>

                            <SocialIcon>
                                <Twitter />
                            </SocialIcon>

                            <SocialIcon>
                                <LinkedIn />
                            </SocialIcon>
                        </Box>
                    </Box>

                    {/* SITEMAP */}
                    <FooterSection
                        title="Sitemap"
                        items={[
                            "Home",
                            "Properties",
                            "My Listings",
                            "Login",
                        ]}
                    />

                    {/* COMPANY */}
                    <FooterSection
                        title="Company"
                        items={[
                            "About Us",
                            "Careers",
                            "Sitemap",
                            "Privacy Policy",
                        ]}
                    />

                    {/* CONTACT */}
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,

                                mb: 3,
                            }}
                        >
                            Contact
                        </Typography>

                        <Typography
                            sx={{
                                mb: 1,

                                color:
                                    "rgba(255,255,255,0.75)",
                            }}
                        >
                            support@homesphere.com
                        </Typography>

                        <Typography
                            sx={{
                                mb: 1,

                                color:
                                    "rgba(255,255,255,0.75)",
                            }}
                        >
                            Delhi, India
                        </Typography>

                        <Typography
                            sx={{
                                color:
                                    "rgba(255,255,255,0.75)",
                            }}
                        >
                            +91 98765 43210
                        </Typography>
                    </Box>
                </Box>

                {/* BOTTOM */}
                <Box
                    sx={{
                        mt: 4,

                        display: "flex",

                        justifyContent:
                            "space-between",

                        flexWrap: "wrap",

                        gap: 2,
                    }}
                >
                    <Typography
                        sx={{
                            color:
                                "rgba(255,255,255,0.6)",

                            fontSize:
                                "14px",
                        }}
                    >
                        © 2026 HomeSphere.
                        All rights reserved.
                    </Typography>

                    <Typography
                        sx={{
                            color:
                                "rgba(255,255,255,0.6)",

                            fontSize:
                                "14px",
                        }}
                    >
                        Designed for modern
                        rental experiences.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

const FooterSection = ({
    title,
    items,
}: any) => {
    return (
        <Box>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 700,

                    mb: 3,
                }}
            >
                {title}
            </Typography>

            <Box
                sx={{
                    display: "flex",

                    flexDirection:
                        "column",

                    gap: 1.5,
                }}
            >
                {items?.map(
                    (item: string) => (
                        <Link
                            key={item}
                            component={RouterLink}
                            to={
                                item === "About Us"
                                    ? "/about-us"
                                    : item ===
                                        "Privacy Policy"
                                        ? "/privacy-policy"
                                        : item ===
                                            "Sitemap"
                                            ? "/sitemap"
                                            : "#"
                            }
                            underline="none"
                            sx={{
                                color:
                                    "rgba(255,255,255,0.75)",

                                cursor:
                                    "pointer",

                                transition:
                                    "0.2s",

                                "&:hover":
                                {
                                    color:
                                        "white",
                                },
                            }}
                        >
                            {item}
                        </Link>
                    )
                )}
            </Box>
        </Box>
    );
};

const SocialIcon = ({
    children,
}: any) => {
    return (
        <Box
            sx={{
                width: "42px",

                height: "42px",

                borderRadius:
                    "12px",

                bgcolor:
                    "rgba(255,255,255,0.08)",

                display: "flex",

                alignItems:
                    "center",

                justifyContent:
                    "center",

                cursor: "pointer",

                transition:
                    "0.2s",

                "&:hover": {
                    bgcolor:
                        "#1E3A8A",

                    transform:
                        "translateY(-2px)",
                },
            }}
        >
            {children}
        </Box>
    );
};

export default Footer;