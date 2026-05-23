import {
    Box,
    Typography,
    Container,
    Button,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import {
    deleteProperty,
    uploadPropertyImages,
} from "../services/propertyService";

import { db } from "../firebase/config";
import BasicInfoStep from "../components/AddProperty/Steps/BasicInfoStep";
import PropertyDetailsStep from "../components/AddProperty/Steps/PropertyDetailsStep";
import UploadPhotosStep from "../components/AddProperty/Steps/UploadPhotosStep";
import { useLoader } from "../context/LoaderContext";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@mui/icons-material";

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
    const navigate = useNavigate();
    const {
        showLoader,
        hideLoader,
    } = useLoader();

    const [selectedSection, setSelectedSection] =
        useState("basic");

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

    useEffect(() => {
        window.scrollTo(0, 0);
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

    const handleDelete =
        async () => {
            if (!id) return;
            showLoader();

            await deleteProperty(id);

            setOpenDeleteModal(false);
            hideLoader();

            navigate("/my-listings");
        };

    return (
        <>
            <Dialog
                open={openDeleteModal}
                onClose={() =>
                    setOpenDeleteModal(false)
                }
            >
                <DialogTitle>
                    Delete Property
                </DialogTitle>

                <DialogContent>
                    <Typography>
                        Are you sure you want to
                        delete this property?
                        This action cannot be
                        undone.
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() =>
                            setOpenDeleteModal(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Container
                maxWidth={false}
                sx={{
                    py: 4,
                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4,
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
                        alignItems: "flex-start",
                    }}
                >
                    {/* LEFT SIDEBAR */}
                    <Paper
                        elevation={2}
                        sx={{
                            width: {
                                xs: "100%",
                                md: "320px",
                            },
                            p: 3,
                            borderRadius: "20px",
                            position: {
                                xs: "static",
                                md: "sticky",
                            },

                            top: 100,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', mb: 3 }}>
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: {
                                        xs: "1.4rem",
                                        md: "1.8rem",
                                    },
                                }}
                            >
                                Edit Property
                            </Typography>
                            <IconButton
                                onClick={() =>
                                    setOpenDeleteModal(true)
                                }
                                sx={{ color: 'red', cursor: 'pointer' }}
                            >
                                <DeleteOutlined />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "row",
                                    md: "column",
                                },
                                gap: 2,
                                overflowX: "auto",
                                pb: 1,
                            }}
                        >
                            {sections?.map(
                                (section) => (
                                    <Box
                                        key={
                                            section?.key
                                        }
                                        onClick={() =>
                                            setSelectedSection(
                                                section?.key
                                            )
                                        }
                                        sx={{
                                            p: 2,
                                            borderRadius:
                                                "14px",
                                            cursor: "pointer",
                                            border:
                                                selectedSection ===
                                                    section?.key
                                                    ? "2px solid #1E3A8A"
                                                    : "1px solid #E2E8F0",
                                            bgcolor:
                                                selectedSection ===
                                                    section?.key
                                                    ? "#EFF6FF"
                                                    : "white",
                                            transition:
                                                "0.2s",
                                            minWidth: {
                                                xs: "180px",
                                                md: "auto",
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                            }}
                                        >
                                            {
                                                section?.title
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
                            height: {
                                xs: "auto",
                                md: "80vh",
                            },
                            width: {
                                xs: '100%',
                                lg: 'auto'
                            },
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                        }}
                    >
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
                            {renderSection()}
                        </Box>

                        <Box
                            sx={{
                                mt: 0,
                                display: "flex",
                                justifyContent: {
                                    xs: "stretch",
                                    md: "flex-end",
                                },
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
                                    ml: {
                                        xs: 4,
                                        lg: 0
                                    },
                                    width: {
                                        xs: "100%",
                                        md: "auto",
                                    },
                                }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
};

export default EditPropertyScreen;