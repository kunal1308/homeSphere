import {
    Box,
    Typography,
    TextField,
    MenuItem,
} from "@mui/material";
import { useEffect } from "react";

interface BasicInfoStepProps {
    formData: any;

    setFormData: React.Dispatch<
        React.SetStateAction<any>
    >;

    domain: string;
}

const BasicInfoStep = ({
    formData,
    setFormData,
    domain,
}: BasicInfoStepProps) => {
    const handleChange = (
        key: string,
        value: string
    ) => {
        setFormData((prev: any) => ({
            ...prev,
            [key]: value,
        }));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box
            sx={{
                maxWidth: "950px",
                width: "100%",
            }}
        >
            {/* Heading */}
            <Typography
                sx={{
                    fontWeight: 600,
                    mb: 1,
                    fontSize: {
                        xs: "1.4rem",
                        md: "1.8rem",
                    },
                }}
            >
                Basic Information
            </Typography>

            <Typography
                sx={{
                    color: "#64748B",
                    mb: 4,
                    fontSize: {
                        xs: "14px",
                        md: "16px",
                    },
                }}
            >
                Enter your property
                basic details.
            </Typography>

            {/* Form Grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, 1fr)",
                    },
                    gap: {
                        xs: 2,
                        md: 3,
                    },
                }}
            >
                {/* Property Title */}
                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 500,
                        }}
                    >
                        Property Title
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="Enter property title"
                        value={formData.title}
                        onChange={(e) =>
                            handleChange(
                                "title",
                                e.target.value
                            )
                        }
                        sx={{
                            "& .MuiOutlinedInput-root":
                            {
                                borderRadius:
                                    "14px",

                                height: "54px",
                            },
                        }}
                    />
                </Box>

                {/* Location */}
                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 500,
                        }}
                    >
                        Location
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="Enter location"
                        value={
                            formData.location
                        }
                        onChange={(e) =>
                            handleChange(
                                "location",
                                e.target.value
                            )
                        }
                        sx={{
                            "& .MuiOutlinedInput-root":
                            {
                                borderRadius:
                                    "14px",

                                height: "54px",
                            },
                        }}
                    />
                </Box>

                {/* Price */}
                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 500,
                        }}
                    >
                        Rent / month
                    </Typography>

                    <TextField
                        fullWidth
                        type="text"
                        slotProps={{
                            htmlInput: {
                                maxLength: 8,
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            },
                        }}
                        placeholder="Enter property price"
                        value={formData.price}
                        onChange={(e) =>
                            handleChange(
                                "price",
                                e.target.value.replace(
                                    /\D/g,
                                    ""
                                )
                            )
                        }
                        sx={{
                            "& .MuiOutlinedInput-root":
                            {
                                borderRadius:
                                    "14px",

                                height: "54px",
                            },
                        }}
                    />
                </Box>

                {/* Commercial Type */}
                {domain ===
                    "commercial" && (
                        <Box>
                            <Typography
                                sx={{
                                    mb: 1,
                                    fontWeight: 500,
                                }}
                            >
                                Commercial Type
                            </Typography>

                            <TextField
                                select
                                fullWidth
                                value={
                                    formData?.commercialType
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "commercialType",
                                        e.target.value
                                    )
                                }
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius:
                                            "14px",

                                        height: "54px",
                                    },
                                }}
                            >
                                {[
                                    "Office",
                                    "Shop",
                                    "Warehouse",
                                    "Showroom",
                                    "Coworking Space",
                                ].map((item) => (
                                    <MenuItem
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    )}

                {/* Bedrooms */}
                {domain === "residential" && (
                    <Box>
                        <Typography
                            sx={{
                                mb: 1,
                                fontWeight: 500,
                            }}
                        >
                            Bedrooms
                        </Typography>

                        <TextField
                            fullWidth
                            type="text"
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    maxLength: 2,
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                },
                            }}
                            placeholder="No. of bedrooms"
                            value={
                                formData.bedrooms
                            }
                            onChange={(e) =>
                                handleChange(
                                    "bedrooms",
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                            onWheel={(e) =>
                                (
                                    e.target as HTMLElement
                                ).blur()
                            }
                            sx={{
                                "& .MuiOutlinedInput-root":
                                {
                                    borderRadius:
                                        "14px",

                                    height:
                                        "54px",
                                },
                            }}
                        />
                    </Box>
                )}

                {/* Bathrooms */}
                {domain === "residential" && (
                    <Box>
                        <Typography
                            sx={{
                                mb: 1,
                                fontWeight: 500,
                            }}
                        >
                            Bathrooms
                        </Typography>

                        <TextField
                            fullWidth
                            type="text"
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    maxLength: 2,
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                },
                            }}
                            placeholder="No. of bathrooms"
                            value={
                                formData.bathrooms
                            }
                            onChange={(e) =>
                                handleChange(
                                    "bathrooms",
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                            onWheel={(e) =>
                                (
                                    e.target as HTMLElement
                                ).blur()
                            }
                            sx={{
                                "& .MuiOutlinedInput-root":
                                {
                                    borderRadius:
                                        "14px",

                                    height:
                                        "54px",
                                },
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default BasicInfoStep;