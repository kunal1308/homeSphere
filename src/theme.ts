import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1E3A8A",
        },
        secondary: {
            main: "#3B82F6",
        },
        background: {
            default: "#F8FAFC",
        },
        text: {
            primary: "#0F172A",
            secondary: "#475569",
        },
    },

    typography: {
        fontFamily: "Inter, sans-serif",
    },
});

export default theme;