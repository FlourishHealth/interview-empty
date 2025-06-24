import {Box, Button, Heading, Text, useToast} from "ferns-ui";
import React, {useCallback} from "react";

import {useAuth} from "@/contexts/AuthContext";

const ClinicianDashboard: React.FC = () => {
  const {user, logout} = useAuth();
  const toast = useToast();

  const handleLogout = useCallback(async (): Promise<void> => {
    console.info("Clinician logging out");

    try {
      await logout();
    } catch {
      toast.error("Failed to logout. Please try again.");
    }
  }, [logout, toast]);

  return (
    <Box
      alignSelf="center"
      color="base"
      flex="grow"
      margin={4}
      padding={4}
      rounding="lg"
      scroll
      width={800}
    >
      <Box alignItems="center" direction="row" gap={2}>
        <Heading>Clinician Dashboard</Heading>
      </Box>

      <Box gap={1} marginBottom={4}>
        <Heading size="sm">Welcome, Dr. {user?.name || "Clinician"}!</Heading>
        <Text>You&apos;re logged in as a Clinician.</Text>
      </Box>

      <Box alignItems="center" marginBottom={5} marginTop={5}>
        <Button text="Logout" variant="destructive" onClick={handleLogout} />
      </Box>
    </Box>
  );
};

export default ClinicianDashboard;
