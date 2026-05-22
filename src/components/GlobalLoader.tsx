import {
    Backdrop,
    CircularProgress,
    Typography,
    Box,
} from "@mui/material";

import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
    const { loading } =
        useLoader();

    return (
        <Backdrop
            open={loading}
            sx={{
                zIndex: 9999,

                backdropFilter:
                    "blur(3px)",

                background:
                    "rgba(255,255,255,0.4)",

                color: "#1E3A8A",

                display: "flex",

                flexDirection:
                    "column",

                gap: 2,
            }}
        >
            <CircularProgress
                color="inherit"
            />

            <Box>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: "18px",
                    }}
                >
                    Loading...
                </Typography>
            </Box>
        </Backdrop>
    );
};

export default GlobalLoader;