import {
    Box,
    IconButton,
    Typography,
} from "@mui/material";

import UploadIcon from "@mui/icons-material/Upload";
import { Close } from "@mui/icons-material";
import { useEffect } from "react";

interface UploadPhotosStepProps {
    formData: any;

    setFormData: React.Dispatch<
        React.SetStateAction<any>
    >;
}

const UploadPhotosStep = ({
    formData,
    setFormData,
}: UploadPhotosStepProps) => {
    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(
            e.target.files || []
        );

        setFormData((prev: any) => {
            const totalImages = [
                ...(prev.images ||
                    []),

                ...files,
            ];

            if (
                totalImages.length >
                10
            ) {
                return prev;
            }

            return {
                ...prev,

                images:
                    totalImages,
            };
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleRemoveImage = (
        indexToRemove: number
    ) => {
        setFormData((prev: any) => ({
            ...prev,

            images:
                prev.images.filter(
                    (
                        _: any,
                        index: number
                    ) =>
                        index !==
                        indexToRemove
                ),
        }));
    };

    return (
        <Box>
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
                Upload Photos
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
                Add high quality photos
                of your property.
            </Typography>

            {/* Upload Box */}
            <Box
                sx={{
                    border:
                        "2px dashed #CBD5E1",

                    borderRadius: "24px",

                    minHeight: {
                        xs: "220px",
                        md: "320px",
                    },
                    p: {
                        xs: 2,
                        md: 4,
                    },

                    display: "flex",

                    flexDirection: "column",

                    alignItems: "center",

                    justifyContent: "center",

                    cursor: "pointer",

                    transition: "0.2s",

                    "&:hover": {
                        borderColor:
                            "#1E3A8A",
                        background:
                            "#F8FAFC",
                    },
                }}
            >
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={
                        handleFileChange
                    }
                    style={{
                        display: "none",
                    }}
                    id="property-upload"
                />

                <label
                    htmlFor="property-upload"
                    style={{
                        cursor: "pointer",
                        textAlign: "center",
                    }}
                >
                    <UploadIcon
                        sx={{
                            fontSize: {
                                xs: 48,
                                md: 64,
                            },
                            color: "#1E3A8A",
                            mb: 2,
                        }}
                    />

                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: {
                                xs: "1rem",
                                md: "1.25rem",
                            },
                        }}
                    >
                        Upload Property Photos
                    </Typography>

                    <Typography
                        sx={{
                            color: "#64748B",
                            mt: 1,
                        }}
                    >
                        JPG, PNG up to 5MB
                    </Typography>
                </label>
            </Box>

            {/* Preview */}
            {formData.images
                ?.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            mt: 4,
                            flexWrap: "wrap",
                            justifyContent: {
                                xs: "center",
                                md: "flex-start",
                            },
                        }}
                    >
                        {formData.images.map(
                            (
                                file: File,
                                index: number
                            ) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: {
                                            xs: 110,
                                            sm: 140,
                                        },
                                        height: {
                                            xs: 110,
                                            sm: 140,
                                        },
                                        borderRadius:
                                            "18px",
                                        overflow:
                                            "hidden",
                                        position: "relative",
                                    }}
                                >
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveImage(
                                                index
                                            )
                                        }}
                                        sx={{
                                            position: "absolute",
                                            top: 6,
                                            right: 6,
                                            width: 28,
                                            height: 28,
                                            bgcolor:
                                                "rgba(0,0,0,0.6)",
                                            color: "white",
                                            zIndex: 2,
                                            "&:hover": {
                                                bgcolor:
                                                    "rgba(0,0,0,0.8)",
                                            },
                                        }}
                                    >
                                        <Close
                                            sx={{
                                                fontSize: 18,
                                            }}
                                        />
                                    </IconButton>
                                    <img
                                        src={
                                            typeof file ===
                                                "string"
                                                ? file
                                                : URL.createObjectURL(
                                                    file
                                                )
                                        }
                                        alt="preview"
                                        style={{
                                            width: "100%",
                                            height:
                                                "100%",
                                            objectFit:
                                                "cover",
                                        }}
                                    />
                                </Box>
                            )
                        )}
                    </Box>
                )
            }
        </Box >
    );
};

export default UploadPhotosStep;