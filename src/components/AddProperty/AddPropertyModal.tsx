import {
    Modal,
    Box,
    Typography,
    Button,
    Stepper,
    Step,
    StepLabel,
    LinearProgress,
} from "@mui/material";

import { auth } from "../../firebase/config";

import { useMemo, useState } from "react";
import BasicInfoStep from "./Steps/BasicInfoStep";
import PropertyDetailsStep from "./Steps/PropertyDetailsStep";
import UploadPhotosStep from "./Steps/UploadPhotosStep";

import {
    createDraftProperty,
    updateDraftProperty,
    uploadPropertyImages
} from "../../services/propertyService";
import SuccessStep from "./Steps/SuccessStep";
import { useLoader } from "../../context/LoaderContext";

interface AddPropertyModalProps {
    open: boolean;
    handleClose: () => void;
}

const AddPropertyModal = ({
    open,
    handleClose,
}: AddPropertyModalProps) => {
    const [currentStep, setCurrentStep] =
        useState(0);

    const [domain, setDomain] =
        useState("");
    const [propertyId, setPropertyId] =
        useState("");
    const [loading, setLoading] =
        useState(false);

    const { showLoader,
        hideLoader
    } = useLoader();

    const [formData, setFormData] =
        useState({
            title: "",
            location: "",
            price: "",

            bedrooms: "",
            bathrooms: "",
            description: "",

            images: [],
        });

    // Steps
    const steps = useMemo(() => {
        return [
            {
                key: "property-type",
                title: "Property Type",
            },

            {
                key: "basic-info",
                title:
                    "Basic Information",
            },

            {
                key: "details",
                title:
                    "Property Details",
            },

            {
                key: "photos",
                title:
                    "Upload Photos",
            },

            {
                key: "review",
                title:
                    "Success",
            },
        ];
    }, []);

    const activeStep =
        steps[currentStep];

    const progress =
        ((currentStep + 1) /
            steps?.length) *
        100;

    const handleNext =
        async () => {
            if (loading) return;

            setLoading(true);
            showLoader();
            try {
                const payload = {
                    ...formData,

                    ownerId:
                        auth.currentUser?.uid,

                    ownerName:
                        auth.currentUser?.displayName,

                    ownerEmail:
                        auth.currentUser?.email,

                    // DON'T SAVE FILE OBJECTS
                    images: [],

                    domain,

                    currentStep:
                        currentStep + 1,
                };

                // CREATE DRAFT
                if (!propertyId) {
                    const newId =
                        await createDraftProperty(
                            payload
                        );

                    setPropertyId(newId);
                }

                // UPDATE DRAFT
                else {
                    const imageUrls =
                        await uploadPropertyImages(
                            formData?.images
                        );

                    await updateDraftProperty(
                        propertyId,
                        {
                            ...payload,

                            images: imageUrls,

                            status:
                                "published",
                        }
                    );
                }

                // FINAL SUBMIT
                if (
                    currentStep ===
                    steps?.length - 1
                ) {
                    const imageUrls =
                        await uploadPropertyImages(
                            formData?.images
                        );

                    await updateDraftProperty(
                        propertyId,
                        {
                            ...payload,

                            images: imageUrls,

                            status:
                                "published",
                        }
                    );

                    handleModalClose();

                    return;
                }

                // NEXT STEP
                setCurrentStep(
                    (prev) => prev + 1
                );
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);

                hideLoader();
            }
        };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(
                (prev) => prev - 1
            );
        }
    };

    const handleModalClose = () => {
        setCurrentStep(0);

        setDomain("");

        setFormData({
            title: "",
            location: "",
            price: "",
            bedrooms: "",
            bathrooms: "",
            description: "",
            images: [],
        });

        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={
                handleModalClose
            }
        >
            <Box
                sx={{
                    width: {
                        xs: "95%",
                        sm: "90%",
                        md: "75%",
                        lg: "60vw",
                    },

                    height: {
                        xs: "85vh",
                        md: "80vh",
                    },

                    maxHeight: "95vh",

                    bgcolor: "white",

                    borderRadius: "28px",

                    overflow: "hidden",

                    display: "flex",

                    flexDirection: "column",

                    mx: "auto",

                    mt: {
                        xs: "1vh",
                        md: "3vh",
                        lg: "10vh"
                    },
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        p: {
                            xs: 2,
                            md: 3,
                        },
                        borderBottom: "1px solid #E2E8F0",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: {
                                xs: "1.3rem",
                                md: "1.7rem",
                            },
                        }}
                    >
                        {
                            activeStep?.title
                        }
                    </Typography>

                    <Typography
                        sx={{
                            color: "#64748B",
                            mt: 0.5,
                        }}
                    >
                        Step{" "}
                        {currentStep + 1}{" "}
                        of {steps?.length}
                    </Typography>

                    {/* Progress */}
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            mt: 2,

                            height: 8,

                            borderRadius:
                                "999px",

                            "& .MuiLinearProgress-bar":
                            {
                                background:
                                    "#1E3A8A",
                            },
                        }}
                    />

                    {/* Stepper */}
                    <Stepper
                        activeStep={
                            currentStep
                        }
                        alternativeLabel
                        sx={{
                            mt: 4,

                            display: {
                                xs: "none",
                                md: "flex",
                            },
                        }}
                    >
                        {steps?.map(
                            (step) => (
                                <Step
                                    key={step.key}
                                >
                                    <StepLabel>
                                        {
                                            step.title
                                        }
                                    </StepLabel>
                                </Step>
                            )
                        )}
                    </Stepper>
                </Box>

                {/* Content */}
                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        p: {
                            xs: 2,
                            md: 4,
                        },
                    }}
                >
                    {/* Property Type */}
                    {activeStep?.key ===
                        "property-type" && (
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: {
                                            xs: "1.3rem",
                                            md: "1.7rem",
                                        },
                                        mb: 3,
                                    }}
                                >
                                    Choose Property
                                    Type
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: {
                                            xs: "column",
                                            sm: "row",
                                        },
                                        gap: 3,
                                    }}
                                >
                                    {[
                                        {
                                            id: "residential",
                                            title:
                                                "Residential",
                                        },

                                        {
                                            id: "commercial",
                                            title:
                                                "Commercial",
                                        },
                                    ].map((item) => {
                                        const isSelected =
                                            domain ===
                                            item?.id;

                                        return (
                                            <Box
                                                key={
                                                    item?.id
                                                }
                                                onClick={() =>
                                                    setDomain(
                                                        item?.id
                                                    )
                                                }
                                                sx={{
                                                    flex: 1,
                                                    border: "2px solid",
                                                    borderColor:
                                                        isSelected
                                                            ? "#1E3A8A"
                                                            : "#E2E8F0",
                                                    borderRadius: "20px",
                                                    p: {
                                                        xs: 3,
                                                        md: 4,
                                                    },
                                                    cursor: "pointer",
                                                    transition: "0.2s",
                                                    bgcolor:
                                                        isSelected
                                                            ? "#EFF6FF"
                                                            : "white",
                                                    "&:hover":
                                                    {
                                                        borderColor:
                                                            "#1E3A8A",
                                                    },
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {
                                                        item?.title
                                                    }
                                                </Typography>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>
                        )}

                    {/* Basic Info */}
                    {/* Basic Info */}
                    {activeStep?.key ===
                        "basic-info" && (
                            <BasicInfoStep
                                formData={formData}
                                setFormData={
                                    setFormData
                                }
                                domain={domain}
                            />
                        )}

                    {/* Details */}
                    {/* Details */}
                    {activeStep?.key ===
                        "details" && (
                            <PropertyDetailsStep
                                formData={formData}
                                setFormData={
                                    setFormData
                                }
                                domain={domain}
                            />
                        )}

                    {/* Photos */}
                    {activeStep?.key ===
                        "photos" && (
                            <UploadPhotosStep
                                formData={formData}
                                setFormData={
                                    setFormData
                                }
                            />
                        )}

                    {/* Review */}
                    {activeStep?.key ===
                        "review" && (
                            <SuccessStep
                                handleClose={handleClose}
                            />
                        )}
                </Box>

                {/* Footer */}
                <Box
                    sx={{
                        p: 3,
                        borderTop: "1px solid #E2E8F0",
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        gap: 2,
                        justifyContent:
                            "space-between",
                    }}
                >
                    <Button
                        disabled={
                            currentStep === 0
                        }
                        onClick={handleBack}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "auto",
                            },
                        }}
                    >
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={
                            activeStep?.key ===
                            "property-type" &&
                            !domain || loading
                        }
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "auto",
                            },
                            bgcolor:
                                "#1E3A8A",
                        }}
                    >
                        {loading
                            ? "Saving..."
                            : currentStep ===
                                steps?.length - 1
                                ? "Submit"
                                : "Next"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddPropertyModal;