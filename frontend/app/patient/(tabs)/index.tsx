import {Box, Button, Heading, Text, useToast} from "ferns-ui";
import React, {useCallback, useEffect, useState} from "react";

import {useAuth} from "@/contexts/AuthContext";

interface User {
  _id: string;
  email: string;
  name: string;
  kind: "Patient" | "Clinician";
  admin: boolean;
}

const PatientDashboard: React.FC = () => {
  const {user, logout, token} = useAuth();
  const [clinicians, setClinicians] = useState<User[]>([]);
  const [cliniciansLoading, setCliniciansLoading] = useState<boolean>(false);
  const toast = useToast();
  console.info("Clinicians", clinicians);

  const fetchClinicians = useCallback(async (): Promise<void> => {
    if (!token) return;

    setCliniciansLoading(true);
    try {
      const response = await fetch("http://localhost:9000/users?kind=Clinician", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch clinicians: ${response.status}`);
      }

      const data = await response.json();
      const clinicianUsers = (data.data || []).filter((u: User) => u.kind === "Clinician");
      setClinicians(clinicianUsers);
    } catch (error) {
      console.error("Failed to fetch clinicians:", error);
      toast.error("Failed to load clinicians. Please try again.");
    } finally {
      setCliniciansLoading(false);
    }
  }, [token, toast]);

  // Fetch clinicians on component mount
  useEffect((): void => {
    fetchClinicians();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = useCallback(async (): Promise<void> => {
    console.info("Patient logging out");

    try {
      await logout();
    } catch {
      toast.error("Failed to logout. Please try again.");
    }
  }, [logout, toast]);

  if (cliniciansLoading) {
    return (
      <Box alignSelf="center" color="base" margin={4} padding={4} rounding="lg">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box
      alignSelf="center"
      color="base"
      flex="grow"
      gap={4}
      margin={4}
      padding={4}
      rounding="lg"
      scroll
      width={800}
    >
      <Box alignItems="center" direction="row" gap={2}>
        <Heading>Patient Dashboard</Heading>
      </Box>

      <Box gap={1} marginBottom={4}>
        <Heading>Welcome, {user?.name || "Patient"}!</Heading>
      </Box>

      <Box alignItems="center" marginBottom={5} marginTop={5}>
        <Button text="Logout" variant="destructive" onClick={handleLogout} />
      </Box>
    </Box>
  );
};

export default PatientDashboard;
