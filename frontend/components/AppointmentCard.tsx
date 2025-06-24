import {Box, Text} from "ferns-ui";
import React from "react";

export interface Patient {
  _id: string;
  name: string;
  email: string;
  kind: string;
}

export interface AppointmentWithPatient {
  _id: string;
  id: string;
  userId: string;
  clinicianId: string;
  start: string;
  patient?: Patient | null;
}

interface AppointmentCardProps {
  appointment: AppointmentWithPatient;
  formatAppointmentTime: (startTime: string) => string;
  isUpcoming: (startTime: string) => boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  formatAppointmentTime,
  isUpcoming,
}) => {
  return (
    <Box
      alignItems="center"
      border="default"
      color={isUpcoming(appointment.start) ? "primary" : "neutralLight"}
      direction="row"
      justifyContent="between"
      padding={3}
      rounding="md"
    >
      <Box gap={1}>
        <Text>{appointment.patient?.name || "Unknown Patient"}</Text>
        <Text size="sm">{appointment.patient?.email || "No email available"}</Text>
        <Text size="sm">{formatAppointmentTime(appointment.start)}</Text>
      </Box>
      <Box alignItems="end">
        <Text size="sm">{isUpcoming(appointment.start) ? "Upcoming" : "Past"}</Text>
      </Box>
    </Box>
  );
};

export default AppointmentCard;
