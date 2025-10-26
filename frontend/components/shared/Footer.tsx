"use client";
import { Box, Card, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Paper className="card" sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 0 }}>
      <Box
      >
       
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "text.secondary",
            fontSize: 13,
          }}
        >
          <Typography>Copyright @ Realseo.digital 2023</Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography>Terms and Conditions</Typography>
            <Typography>Privacy Policy</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
