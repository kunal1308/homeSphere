import {
    Box,
    Typography,
    TextField,
    MenuItem,
} from "@mui/material";

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

    return (
        <Box
            sx={{
                maxWidth: "950px",
            }}
        >
            {/* Heading */}
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 600,
                    mb: 1,
                }}
            >
                Basic Information
            </Typography>

            <Typography
                sx={{
                    color: "#64748B",
                    mb: 4,
                }}
            >
                Enter your property
                basic details.
            </Typography>

            {/* Form Grid */}
            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(2, 1fr)",

                    gap: 3,
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
                        type="number"
                        placeholder="Enter property price"
                        value={formData.price}
                        onChange={(e) =>
                            handleChange(
                                "price",
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
                            type="number"
                            placeholder="No. of bedrooms"
                            value={
                                formData.bedrooms
                            }
                            onChange={(e) => {
                                const value =
                                    Math.max(
                                        0,
                                        Number(
                                            e.target.value
                                        )
                                    );

                                handleChange(
                                    "bedrooms",
                                    value.toString()
                                );
                            }}
                            onWheel={(e) =>
                                (
                                    e.target as HTMLElement
                                ).blur()
                            }
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                },
                            }}
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
                            type="number"
                            placeholder="No. of bathrooms"
                            value={
                                formData.bathrooms
                            }
                            onChange={(e) => {
                                const value =
                                    Math.max(
                                        0,
                                        Number(
                                            e.target.value
                                        )
                                    );

                                handleChange(
                                    "bathrooms",
                                    value.toString()
                                );
                            }}
                            onWheel={(e) =>
                                (
                                    e.target as HTMLElement
                                ).blur()
                            }
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                },
                            }}
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