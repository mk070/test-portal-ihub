import React, { useState } from "react";
import { Tabs, Tab, AppBar, Typography, Box, Container } from "@mui/material";
import { styled } from "@mui/system";

// Custom styling for tabs
const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#064E3B", // Green underline
  },
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#000",
  "&.Mui-selected": {
    color: "#064E3B", // Green text for selected
  },
});

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="md" className="py-10">
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0} className="mb-5">
        <Typography variant="h5" className="font-bold">
          Hi! Madhan P
        </Typography>
      </AppBar>

      {/* Tabs */}
      <StyledTabs value={activeTab} onChange={handleTabChange}>
        <StyledTab label="Assigned to you" />
        <StyledTab label="Completed/Closed" />
      </StyledTabs>

      {/* Tab Content */}
      <Box className="mt-8 text-center">
        {activeTab === 0 && (
          <Box>
            {/* Image and message for "Assigned to you" tab */}
            <img
              src="https://via.placeholder.com/300" // Replace with your exact illustration URL
              alt="No Exams"
              className="mx-auto"
              style={{ width: "200px", height: "200px" }}
            />
            <Typography variant="h6" className="font-bold mt-4">
              Any day is a good day when <br />
              there are no exams!
            </Typography>
          </Box>
        )}
        {activeTab === 1 && (
          <Typography variant="h6" className="font-bold mt-4">
            No completed or closed exams yet.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default StudentDashboard;
