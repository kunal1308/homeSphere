import { Bathtub, Bed, Business, DirectionsCar, LocationOn, SquareFoot } from "@mui/icons-material";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";

interface PropertyCardProps {
    property: any;
    isOwner?: boolean;
}

const PropertyCard = ({
    property,
    isOwner = false,
}: PropertyCardProps) => {
    const navigate = useNavigate();

    const isCommercial =
        property?.domain ===
        "commercial";

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
            }}
        >
            <ImageSlider
                images={
                    property?.images ||
                    []
                }
            />

            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {property?.title}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.5,
                    }}
                >
                    <LocationOn
                        sx={{
                            fontSize: 18,
                            color: "#64748B",
                        }}
                    />

                    <Typography color="text.secondary">
                        {property?.location}
                    </Typography>
                </Box>

                <Box sx={{ mt: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 500, color: "primary" }}
                    >
                        ₹ {Number(
                            property?.price
                        )?.toLocaleString()} / month
                    </Typography>
                </Box>

                <Box
                    sx={{
                        mt: 1.5,
                        display: "flex",
                        gap: 3,
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {isCommercial ? (
                        <>
                            {/* Commercial Type */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Business
                                    sx={{
                                        fontSize: 20,
                                        color: "#1E3A8A",
                                    }}
                                />

                                <Typography>
                                    {property?.commercialType ||
                                        "Office"}
                                </Typography>
                            </Box>

                            {/* Area */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <SquareFoot
                                    sx={{
                                        fontSize: 20,
                                        color: "#1E3A8A",
                                    }}
                                />

                                <Typography>
                                    {property?.area ||
                                        1200}{" "}
                                    sq.ft
                                </Typography>
                            </Box>

                            {/* Parking */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <DirectionsCar
                                    sx={{
                                        fontSize: 20,
                                        color: "#1E3A8A",
                                    }}
                                />

                                <Typography>
                                    {property?.parking
                                        ? "Parking"
                                        : "No Parking"}
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        <>
                            {/* Bedrooms */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Bed
                                    sx={{
                                        fontSize: 20,
                                        color: "#1E3A8A",
                                    }}
                                />

                                <Typography>
                                    {property?.bedrooms ||
                                        2}{" "}
                                    Beds
                                </Typography>
                            </Box>

                            {/* Bathrooms */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Bathtub
                                    sx={{
                                        fontSize: 20,
                                        color: "#1E3A8A",
                                    }}
                                />

                                <Typography>
                                    {property?.bathrooms ||
                                        1}{" "}
                                    Baths
                                </Typography>
                            </Box>
                        </>
                    )}
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => {
                        if (isOwner) {
                            navigate(
                                `/edit-property/${property?.id}`
                            )
                        } else {
                            navigate(
                                `/property-details/${property?.id}`
                            )
                        }
                    }}
                >
                    {isOwner
                        ? "Edit Property"
                        : "View Details"}
                </Button>
            </CardContent>
        </Card>
    );
};

export default PropertyCard;