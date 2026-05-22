import {
    Dialog,
    Box,
    Typography,
    IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
import TerrainIcon from "@mui/icons-material/Terrain";

import SellIcon from "@mui/icons-material/Sell";
import KeyIcon from "@mui/icons-material/Key";

interface PropertyTypeDialogProps {
    open: boolean;
    handleClose: () => void;

    intent: string;
    setIntent: (value: string) => void;

    domain: string;
    setDomain: (value: string) => void;

    onContinue: () => void;
}

const PropertyTypeDialog = ({
    open,
    handleClose,
    intent,
    setIntent,
    domain,
    setDomain,
    onContinue,
}: PropertyTypeDialogProps) => {
    const intents = [
        {
            id: "sell",
            title: "Sell",
            subtitle:
                "List property for selling",
            icon: <SellIcon />,
        },
        {
            id: "rent",
            title: "Rent",
            subtitle:
                "List property for rent",
            icon: <KeyIcon />,
        },
    ];

    const propertyTypes = [
        {
            id: "residential",
            title: "Residential",
            subtitle:
                "Apartment, Villa, PG",
            icon: <HomeWorkIcon />,
        },
        {
            id: "commercial",
            title: "Commercial",
            subtitle:
                "Office, Shop, Warehouse",
            icon: <ApartmentIcon />,
        },
        {
            id: "plot",
            title: "Plot / Land",
            subtitle:
                "Residential, Commercial",
            icon: <TerrainIcon />,
        },
    ];

    const filteredTypes =
        intent === "rent"
            ? propertyTypes.filter(
                (i) => i.id !== "plot"
            )
            : propertyTypes;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "24px",
                    p: 1,
                },
            }}
        >
            <Box sx={{ p: 3 }}>
                {/* Close */}
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 16,
                        top: 16,
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {/* Heading */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    List Your Property
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        color: "#64748B",
                        mt: 1,
                    }}
                >
                    Choose listing type
                </Typography>

                <Box
                    sx={{
                        borderTop:
                            "1px solid #E2E8F0",
                        mt: 3,
                        mb: 4,
                    }}
                />

                {/* Intent */}
                <Typography
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                    }}
                >
                    What would you like to do?
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        mb: 4,
                    }}
                >
                    {intents.map((item) => {
                        const isSelected =
                            intent === item.id;

                        return (
                            <Box
                                key={item.id}
                                onClick={() =>
                                    setIntent(item.id)
                                }
                                sx={{
                                    flex: 1,
                                    border:
                                        "1px solid #E2E8F0",
                                    borderColor:
                                        isSelected
                                            ? "#1E3A8A"
                                            : "#E2E8F0",
                                    borderRadius: "18px",
                                    p: 2,
                                    cursor: "pointer",
                                    transition: "0.2s",
                                    bgcolor: isSelected
                                        ? "#EFF6FF"
                                        : "white",

                                    "&:hover": {
                                        borderColor:
                                            "#1E3A8A",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: "50%",
                                        bgcolor: "#DBEAFE",
                                        display: "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "center",
                                        color: "#1E3A8A",
                                        mb: 2,
                                    }}
                                >
                                    {item.icon}
                                </Box>

                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        color: isSelected
                                            ? "#1E3A8A"
                                            : "#111827",
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        color: "#64748B",
                                        mt: 0.5,
                                    }}
                                >
                                    {item.subtitle}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>

                {/* Property Type */}
                {intent && (
                    <>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            Property Type
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection:
                                    "column",
                                gap: 2,
                            }}
                        >
                            {filteredTypes.map(
                                (item) => {
                                    const isSelected =
                                        domain === item.id;

                                    return (
                                        <Box
                                            key={item.id}
                                            onClick={() =>
                                                setDomain(
                                                    item.id
                                                )
                                            }
                                            sx={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: 2,
                                                border:
                                                    "1px solid #E2E8F0",
                                                borderColor:
                                                    isSelected
                                                        ? "#1E3A8A"
                                                        : "#E2E8F0",
                                                borderRadius:
                                                    "18px",
                                                p: 2,
                                                cursor:
                                                    "pointer",
                                                transition:
                                                    "0.2s",
                                                bgcolor:
                                                    isSelected
                                                        ? "#EFF6FF"
                                                        : "white",

                                                "&:hover": {
                                                    borderColor:
                                                        "#1E3A8A",
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 44,
                                                    height: 44,
                                                    borderRadius:
                                                        "50%",
                                                    bgcolor:
                                                        "#DBEAFE",
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    justifyContent:
                                                        "center",
                                                    color:
                                                        "#1E3A8A",
                                                }}
                                            >
                                                {item.icon}
                                            </Box>

                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        color:
                                                            isSelected
                                                                ? "#1E3A8A"
                                                                : "#111827",
                                                    }}
                                                >
                                                    {item.title}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            "14px",
                                                        color:
                                                            "#64748B",
                                                    }}
                                                >
                                                    {
                                                        item.subtitle
                                                    }
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                }
                            )}
                        </Box>
                    </>
                )}

                {/* Continue */}
                <Box
                    sx={{
                        mt: 4,
                    }}
                >
                    <Box
                        onClick={() => {
                            if (
                                intent &&
                                domain
                            ) {
                                onContinue();
                            }
                        }}
                        sx={{
                            bgcolor:
                                intent && domain
                                    ? "#1E3A8A"
                                    : "#CBD5E1",
                            color: "white",
                            py: 1.7,
                            borderRadius: "14px",
                            textAlign: "center",
                            fontWeight: 600,
                            cursor:
                                intent && domain
                                    ? "pointer"
                                    : "not-allowed",
                            transition: "0.2s",
                        }}
                    >
                        Continue
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
};

export default PropertyTypeDialog;