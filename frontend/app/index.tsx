import {Redirect} from "expo-router";

import {useAuth} from "@/contexts/AuthContext";

export default function Index(): React.ReactElement | null {
  const {isLoggedIn, isLoading, user} = useAuth();

  // TODO: Add a loading screen.
  if (isLoading) return null;

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Redirect href={user?.kind === "Clinician" ? "/clinician" : "/patient"} />;
}
