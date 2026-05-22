import {
    Box,
    Typography,
    Container,
    Button,
    Paper,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import {
    uploadPropertyImages,
} from "../services/propertyService";

import { db } from "../firebase/config";
import BasicInfoStep from "../components/AddProperty/Steps/BasicInfoStep";
import PropertyDetailsStep from "../components/AddProperty/Steps/PropertyDetailsStep";
import UploadPhotosStep from "../components/AddProperty/Steps/UploadPhotosStep";
import { useLoader } from "../context/LoaderContext";
import { toast } from "react-toastify";

const sections = [
    {
        key: "basic",
        title: "Basic Info",
    },
    {
        key: "details",
        title: "Property Details",
    },
    {
        key: "photos",
        title: "Photos",
    },
];

const EditPropertyScreen = () => {
    const { id } = useParams();
    const {
        showLoader,
        hideLoader,
    } = useLoader();

    const [selectedSection, setSelectedSection] =
        useState("basic");

    const [formData, setFormData] =
        useState<any>({
            title: "",
            description: "",
            location: "",
            propertyType: "",
            listingType: "",
            price: "",
            bedrooms: "",
            bathrooms: "",
            parking: false,
            images: [],
        });

    useEffect(() => {
        fetchProperty();
    }, []);

    const fetchProperty = async () => {
        try {
            showLoader();
            const propertyRef = doc(
                db,
                "properties",
                id as string
            );

            const snapshot =
                await getDoc(propertyRef);

            if (snapshot.exists()) {
                setFormData({
                    id: snapshot.id,
                    ...snapshot.data(),
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            hideLoader();
        }
    };

    const handleSave =
        async () => {
            try {
                showLoader();

                const propertyRef = doc(
                    db,
                    "properties",
                    id as string
                );

                let finalImages =
                    formData.images || [];

                // NEW FILES ONLY
                const newFiles =
                    finalImages.filter(
                        (
                            img: any
                        ) =>
                            typeof img !==
                            "string"
                    );

                // EXISTING URLS
                const existingUrls =
                    finalImages.filter(
                        (
                            img: any
                        ) =>
                            typeof img ===
                            "string"
                    );

                // UPLOAD NEW FILES
                let uploadedUrls:
                    string[] = [];

                if (
                    newFiles.length > 0
                ) {
                    uploadedUrls =
                        await uploadPropertyImages(
                            newFiles
                        );
                }

                // FINAL IMAGE ARRAY
                finalImages = [
                    ...existingUrls,
                    ...uploadedUrls,
                ];

                await updateDoc(
                    propertyRef,
                    {
                        ...formData,

                        images:
                            finalImages,
                    }
                );

                toast.success(
                    "Property updated successfully"
                );
            } catch (error) {
                console.log(error);
            } finally {
                hideLoader();
            }
        };

    const renderSection = () => {
        switch (
        selectedSection
        ) {
            case "basic":
                return (
                    <BasicInfoStep
                        formData={formData}
                        setFormData={
                            setFormData
                        }
                        domain={
                            formData?.domain
                        }
                    />
                );

            case "details":
                return (
                    <PropertyDetailsStep
                        formData={formData}
                        setFormData={
                            setFormData
                        }
                        domain={
                            formData?.domain
                        }
                    />
                );

            case "photos":
                return (
                    <UploadPhotosStep
                        formData={formData}
                        setFormData={
                            setFormData
                        }
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                py: 4,
                px: 4,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: 4,
                    alignItems: "flex-start",
                }}
            >
                {/* LEFT SIDEBAR */}
                <Paper
                    elevation={2}
                    sx={{
                        width: "320px",
                        p: 3,
                        borderRadius: "20px",
                        position: "sticky",
                        top: 100,
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            mb: 3,
                        }}
                    >
                        Edit Property
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection:
                                "column",
                            gap: 2,
                        }}
                    >
                        {sections.map(
                            (section) => (
                                <Box
                                    key={
                                        section.key
                                    }
                                    onClick={() =>
                                        setSelectedSection(
                                            section.key
                                        )
                                    }
                                    sx={{
                                        p: 2,
                                        borderRadius:
                                            "14px",
                                        cursor: "pointer",
                                        border:
                                            selectedSection ===
                                                section.key
                                                ? "2px solid #1E3A8A"
                                                : "1px solid #E2E8F0",
                                        bgcolor:
                                            selectedSection ===
                                                section.key
                                                ? "#EFF6FF"
                                                : "white",
                                        transition:
                                            "0.2s",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                        }}
                                    >
                                        {
                                            section.title
                                        }
                                    </Typography>
                                </Box>
                            )
                        )}
                    </Box>
                </Paper>

                {/* RIGHT CONTENT */}
                <Paper
                    elevation={2}
                    sx={{
                        flex: 1,

                        borderRadius: "20px",
                        height: "80vh",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            p: 4,
                        }}
                    >
                        {renderSection()}
                    </Box>

                    <Box
                        sx={{
                            mt: 0,
                            display: "flex",
                            justifyContent:
                                "flex-end",
                            pr: 5,
                            pb: 4,
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={
                                handleSave
                            }
                            sx={{
                                borderRadius:
                                    "12px",
                                px: 5,
                            }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default EditPropertyScreen;