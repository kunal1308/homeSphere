import {
  Box,
  Typography,
  Container,
  Button,
  Card,
} from "@mui/material";

import ApartmentIcon from "@mui/icons-material/Apartment";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { useEffect, useState } from "react";

import {
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

import { auth } from "../firebase/config";
import { getUserData } from "../services/authService";

interface HomeOutletContext {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Home = () => {
  const navigate = useNavigate();

  const { onLoginClick } =
    useOutletContext<HomeOutletContext>();

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {
          if (user) {
            const userData =
              await getUserData(
                user.uid
              );

            const role =
              userData?.role || "";

            setUserRole(role);

            // Logged-in users skip the
            // landing page — Home is only
            // for logged-out visitors
            navigate(
              role === "owner"
                ? "/my-listings"
                : "/properties",
              { replace: true }
            );
          } else {
            setUserRole("");
          }
        }
      );

    return () => unsubscribe();
  }, [navigate]);

  // Browse-type CTAs: tenants go to the
  // property grid, owners to their listings
  const handleBrowseClick = () => {
    if (!auth.currentUser) {
      onLoginClick();
      return;
    }

    navigate(
      userRole === "owner"
        ? "/my-listings"
        : "/properties"
    );
  };

  // List-type CTAs: only owners can list
  const handleListClick = () => {
    if (!auth.currentUser) {
      onLoginClick();
      return;
    }

    if (userRole === "owner") {
      navigate("/my-listings");
    } else {
      toast.info(
        "Only owner accounts can list properties"
      );
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.75), rgba(30,58,138,0.85)), url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070')",

          color: "white",

          py: {
            xs: 10,
            md: 16,
          },

          position:
            "relative",

          overflow:
            "hidden",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            px: {
              xs: 2,
              sm: 3,
              md: 6,
            },
          }}
        >
          <Box
            sx={{
              maxWidth:
                "900px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,

                fontSize: {
                  xs: "2.1rem",
                  sm: "2.6rem",
                  md: "3.25rem",
                  lg: "3.75rem",
                },

                lineHeight: 1.15,

                mb: 4,
              }}
            >
              Find Your
              Dream Rental
              Property
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "16px",
                  md: "22px",
                },

                opacity: 0.9,

                maxWidth:
                  "700px",

                lineHeight: 1.8,

                mb: 5,
              }}
            >
              Explore premium
              residential and
              commercial rental
              properties with
              modern amenities,
              verified owners,
              and seamless
              booking experience.
            </Typography>

            <Box
              sx={{
                display: "flex",

                flexDirection: {
                  xs: "column",
                  sm: "row",
                },

                gap: 2,

                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={
                  handleBrowseClick
                }
                sx={{
                  height: "58px",
                  px: 5,
                  borderRadius: "14px",
                  fontWeight: 600,
                  fontSize: "16px",
                  bgcolor: "white",
                  color: "#1E3A8A",
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },

                  "&:hover":
                  {
                    bgcolor:
                      "#E2E8F0",
                  },
                }}
              >
                Explore
                Properties
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={
                  handleListClick
                }
                sx={{
                  height:
                    "58px",

                  px: 5,
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },

                  borderRadius:
                    "14px",

                  fontWeight: 600,

                  fontSize:
                    "16px",

                  borderColor:
                    "white",

                  color:
                    "white",

                  "&:hover":
                  {
                    borderColor:
                      "white",

                    bgcolor:
                      "rgba(255,255,255,0.1)",
                  },
                }}
              >
                List Property
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: {
                xs: "center",
                md: "flex-start",
              },

              mt: 8,
            }}
          >
            <StatCard
              value="500+"
              label="Verified Listings"
            />

            <StatCard
              value="1K+"
              label="Happy Tenants"
            />

            <StatCard
              value="150+"
              label="Property Owners"
            />
          </Box>
        </Container>
      </Box>

      {/* WHY CHOOSE */}
      <Container
        maxWidth={false}
        sx={{
          py: {
            xs: 4,
            lg: 10
          },
          px: {
            xs: 3,
            md: 6,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: {
              xs: 4,
              lg: 7
            },
            fontSize: {
              xs: "2rem",
              md: "3rem",
            },
          }}
        >
          Why Choose
          HomeSphere?
        </Typography>

        <Box
          sx={{
            display: "flex",

            flexWrap: "wrap",

            gap: 4,

            justifyContent:
              "center",
          }}
        >
          <FeatureCard
            icon={
              <VerifiedUserIcon
                fontSize="large"
              />
            }
            title="Verified Listings"
            description="All properties are verified for quality and authenticity."
          />

          <FeatureCard
            icon={
              <ApartmentIcon
                fontSize="large"
              />
            }
            title="Modern Properties"
            description="Explore residential and commercial spaces tailored to your needs."
          />

          <FeatureCard
            icon={
              <TrendingUpIcon
                fontSize="large"
              />
            }
            title="Easy Renting"
            description="Smooth property discovery and rental application experience."
          />
        </Box>
      </Container>

      {/* TENANT / OWNER SECTION */}
      <Box
        sx={{
          bgcolor:
            "#F8FAFC",

          py: {
            xs: 4,
            lg: 10
          },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            px: {
              xs: 3,
              md: 6,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",

              flexDirection: {
                xs: "column",
                md: "row",
              },

              gap: 4,

              flexWrap: "wrap",
            }}
          >
            {/* TENANTS */}
            <Card
              sx={{
                flex: 1,
                width: "100%",
                p: 5,

                borderRadius:
                  "24px",

                boxShadow: 2,
              }}
            >
              <Box
                component="img"
                alt="Tenant browsing verified rental properties on HomeSphere"
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200"
                sx={{
                  width: "100%",
                  height: {
                    xs: "180px",
                    md: "220px",
                  },
                  objectFit: "cover",
                  borderRadius: "18px",
                  mb: 3,
                }}
              />

              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 700,

                  mb: 2,
                }}
              >
                For Tenants
              </Typography>

              <Typography
                sx={{
                  color:
                    "#64748B",

                  lineHeight: 1.8,

                  mb: 4,
                }}
              >
                Browse verified
                rental properties,
                connect with
                owners, and apply
                seamlessly for
                your next home or
                office space.
              </Typography>

              <Button
                variant="contained"
                onClick={
                  handleBrowseClick
                }
                sx={{
                  borderRadius:
                    "12px",

                  px: 4,
                }}
              >
                Browse
                Properties
              </Button>
            </Card>

            {/* OWNERS */}
            <Card
              sx={{
                flex: 1,
                width: "100%",
                p: 5,
                borderRadius: "24px",
                boxShadow: 2,
              }}
            >
              <Box
                component="img"
                alt="Property owner listing a home on HomeSphere"
                src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200"
                sx={{
                  width: "100%",
                  height: {
                    xs: "180px",
                    md: "220px",
                  },
                  objectFit: "cover",
                  borderRadius: "18px",
                  mb: 3,
                }}
              />

              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 700,

                  mb: 2,
                }}
              >
                For Owners
              </Typography>

              <Typography
                sx={{
                  color:
                    "#64748B",

                  lineHeight: 1.8,

                  mb: 4,
                }}
              >
                List your
                residential or
                commercial
                property, manage
                listings, and
                receive rental
                applications from
                potential tenants.
              </Typography>

              <Button
                variant="contained"
                onClick={
                  handleListClick
                }
                sx={{
                  borderRadius:
                    "12px",

                  px: 4,
                }}
              >
                Add Listing
              </Button>
            </Card>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #0F172A, #1E3A8A)",

          color: "white",

          py: 12,

          mt: 10,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Ready to Find Your
            Next Property?
          </Typography>

          <Typography
            sx={{
              maxWidth: "700px",
              mx: "auto",
              mb: 5,
              opacity: 0.9,
              lineHeight: 1.8,
            }}
          >
            Join HomeSphere
            today and explore
            modern rental
            experiences for
            tenants and owners.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={
              handleBrowseClick
            }
            sx={{
              bgcolor: "white",
              color: "#1E3A8A",
              px: 5,
              py: 1.5,
              borderRadius: "14px",
              fontWeight: 700,

              "&:hover": {
                bgcolor: "#E2E8F0",
              },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: any) => {
  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          sm: "320px",
          md: "350px",
        },

        p: 4,

        borderRadius:
          "24px",

        boxShadow: 2,

        textAlign:
          "center",
      }}
    >
      <Box
        sx={{
          color: "#1E3A8A",

          mb: 3,
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 700,

          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          color: "#64748B",

          lineHeight: 1.8,
        }}
      >
        {description}
      </Typography>
    </Card>
  );
};

const StatCard = ({
  value,
  label,
}: any) => {
  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          sm: "220px",
        },
        p: 4,
        borderRadius: "20px",
        textAlign: "center",
        bgcolor:
          "rgba(255,255,255,0.12)",

        backdropFilter:
          "blur(8px)",

        color: "white",
      }}
    >
      <Typography
        sx={{
          fontWeight: 800,
          mb: 1,
          fontSize: {
            xs: "2rem",
            md: "3rem",
          },
        }}
      >
        {value}
      </Typography>

      <Typography>
        {label}
      </Typography>
    </Card>
  );
};

export default Home;