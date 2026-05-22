import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface SuccessStepProps {
  handleClose: () => void;
}

const SuccessStep = ({
  handleClose,
}: SuccessStepProps) => {
  return (
    <Box
      sx={{
        height: "100%",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        justifyContent: "center",

        textAlign: "center",

        px: 4,
      }}
    >
      {/* Icon */}
      <CheckCircleIcon
        sx={{
          fontSize: 100,
          color: "#1E3A8A",
          mb: 3,
        }}
      />

      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",

          mb: 2,
        }}
      >
        Property Listed Successfully!
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          color: "#64748B",

          maxWidth: "500px",

          mb: 5,

          fontSize: "17px",
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