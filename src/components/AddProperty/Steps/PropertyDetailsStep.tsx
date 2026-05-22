import {
    Box,
    Typography,
    TextField,
    MenuItem,
} from "@mui/material";

interface PropertyDetailsStepProps {
    formData: any;

    setFormData: React.Dispatch<
        React.SetStateAction<any>
    >;

    domain: string;
}

const furnishingOptions = [
    "Fully Furnished",
    "Semi Furnished",
    "Unfurnished",
];

const availabilityOptions = [
    "Immediate",
    "Within 15 Days",
    "Within 30 Days",
];

const PropertyDetailsStep = ({
    formData,
    setFormData,
    domain,
}: PropertyDetailsStepProps) => {
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
                Property Details
            </Typography>

            <Typography
                sx={{
                    color: "#64748B",
                    mb: 4,
                }}
            >
                Add more details
                about your property.
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
                {/* Area */}
                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 500,
                        }}
                    >
                        Area (sq ft)
                    </Typography>

                    <TextField
                        fullWidth
                        type="number"
                        placeholder="Enter area"
                        value={formData.area}
                        onChange={(e) =>
                            handleChange(
                                "area",
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

                {/* Furnishing */}
                {domain !== "plot" && (
                    <Box>
                        <Typography
                            sx={{
                                mb: 1,
                                fontWeight: 500,
                            }}
                        >
                            Furnishing
                        </Typography>

                        <TextField
                            select
                            fullWidth
                            value={
                                formData.furnishing
                            }
                            onChange={(e) =>
                                handleChange(
                                    "furnishing",
                                    e.target.value
                                )
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
                        >
                            {furnishingOptions.map(
                                (item) => (
                                    <MenuItem
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </MenuItem>
                                )
                            )}
                        </TextField>
                    </Box>
                )}

                {/* Availability */}
                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 500,
                        }}
                    >
                        Availability
                    </Typography>

                    <TextField
                        select
                        fullWidth
                        value={
                            formData.availability
                        }
                        onChange={(e) =>
                            handleChange(
                                "availability",
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
                        {availabilityOptions.map(
                            (item) => (
                                <MenuItem
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                </Box>

                {/* Parking */}
                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 500,
                        }}
                    >
                        Parking Available
                    </Typography>

                    <TextField
                        select
                        fullWidth
                        value={
                            formData.parking
                        }
                        onChange={(e) =>
                            handleChange(
                                "parking",
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
                        <MenuItem value="Yes">
                            Yes
                        </MenuItem>

                        <MenuItem value="No">
                            No
                        </MenuItem>
                    </TextField>
                </Box>

                {formData.commercialType ===
                    "Office" && (
                        <>
                            <Box>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Number of Cabins
                                </Typography>

                                <TextField
                                    fullWidth
                                    type="number"
                                    value={
                                        formData.cabins
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "cabins",
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

                            <Box>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Workstations
                                </Typography>

                                <TextField
                                    fullWidth
                                    type="number"
                                    value={
                                        formData.workstations
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "workstations",
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
                        </>
                    )}

                {formData.commercialType ===
                    "Shop" && (
                        <>
                            <Box>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Floor Number
                                </Typography>

                                <TextField
                                    fullWidth
                                    type="number"
                                    value={
                                        formData.floorNumber
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "floorNumber",
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

                            <Box>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Main Road Facing
                                </Typography>

                                <TextField
                                    select
                                    fullWidth
                                    value={
                                        formData.mainRoadFacing
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "mainRoadFacing",
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
                                    <MenuItem value="Yes">
                                        Yes
                                    </MenuItem>

                                    <MenuItem value="No">
                                        No
                                    </MenuItem>
                                </TextField>
                            </Box>
                        </>
                    )}

                {formData.commercialType ===
                    "Warehouse" && (
                        <>
                            <Box>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Ceiling Height
                                </Typography>

                                <TextField
                                    fullWidth
                                    placeholder="e.g. 24 ft"
                                    value={
                                        formData.ceilingHeight
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "ceilingHeight",
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

                            <Box>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Truck Accessibility
                                </Typography>

                                <TextField
                                    select
                                    fullWidth
                                    value={
                                        formData.truckAccess
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "truckAccess",
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
                                    <MenuItem value="Yes">
                                        Yes
                                    </MenuItem>

                                    <MenuItem value="No">
                                        No
                                    </MenuItem>
                                </TextField>
                            </Box>
                        </>
                    )}

                {formData.commercialType ===
                    "Showroom" && (
                        <>
                            <Box>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Frontage Width
                                </Typography>

                                <TextField
                                    fullWidth
                                    placeholder="e.g. 20 ft"
                                    value={
                                        formData.frontage
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "frontage",
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

                            <Box>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Visitor Parking
                                </Typography>

                                <TextField
                                    select
                                    fullWidth
                                    value={
                                        formData.visitorParking
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "visitorParking",
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
                                    <MenuItem value="Yes">
                                        Yes
                                    </MenuItem>

                                    <MenuItem value="No">
                                        No
                                    </MenuItem>
                                </TextField>
                            </Box>
                        </>
                    )}

                {formData.commercialType ===
                    "Coworking Space" && (
                        <>
                            <Box>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Seating Capacity
                                </Typography>

                                <TextField
                                    fullWidth
                                    type="number"
                                    value={
                                        formData.seatingCapacity
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "seatingCapacity",
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

                            <Box>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Meeting Rooms
                                </Typography>

                                <TextField
                                    fullWidth
                                    type="number"
                                    value={
                                        formData.meetingRooms
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "meetingRooms",
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
                        </>
                    )}

                {/* Description */}
                <Box
                    sx={{
                        gridColumn:
                            "1 / -1",
                    }}
                >
                    <Typography
                        sx={{
                            mb: 1,
                            fontWeight: 500,
                        }}
                    >
                        Description
                    </Typography>

                    <TextField
                        fullWidth
                        multiline
                        rows={5}
                        placeholder="Describe your property..."
                        value={
                            formData.description
                        }
                        onChange={(e) =>
                            handleChange(
                                "description",
                                e.target.value
                            )
                        }
                        sx={{
                            "& .MuiOutlinedInput-root":
                            {
                                borderRadius:
                                    "14px",
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PropertyDetailsStep;