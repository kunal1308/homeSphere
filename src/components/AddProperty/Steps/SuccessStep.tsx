import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect } from "react";

interface SuccessStepProps {
  handleClose: () => void;
}

const SuccessStep = ({
  handleClose,
}: SuccessStepProps) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        height: "100%",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        justifyContent: "center",

        textAlign: "center",

        px: {
          xs: 2,
          md: 4,
        },
      }}
    >
      {/* Icon */}
      <CheckCircleIcon
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          fontSize: 100,

          color: "#1E3A8A",

          mb: 3,
        }}
      />

      {/* Heading */}
      <Typography
        sx={{
          fontWeight: "bold",

          mb: 2,

          mt: {
            xs: 2,
            md: 0,
          },

          fontSize: {
            xs: "2rem",
            md: "3rem",
          },

          lineHeight: 1.2,
        }}
      >
        Property Listed
        Successfully!
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          color: "#64748B",

          maxWidth: "500px",

          mb: 5,

          lineHeight: 1.8,

          fontSize: {
            xs: "15px",
            md: "17px",
          },
        }}
      >
        Your property has been
        published successfully
        and is now visible to
        potential tenants and
        buyers.
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        onClick={handleClose}
        sx={{
          bgcolor: "#1E3A8A",

          px: 5,

          py: 1.5,

          width: {
            xs: "100%",
            sm: "auto",
          },

          borderRadius: "14px",

          fontWeight: 600,

          textTransform:
            "none",

          fontSize: "16px",

          "&:hover": {
            bgcolor: "#172554",
          },
        }}
      >
        Back To Listings
      </Button>
    </Box>
  );
};

export default SuccessStep;