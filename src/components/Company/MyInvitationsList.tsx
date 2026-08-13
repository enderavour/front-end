import { Stack, Typography } from "@mui/material";

import { useGetMyInvitationsQuery } from "../../store/companyApi";
import { UserInvitationCard } from "../Users/UserInvitationCard";
import { Loader } from "../ui/Loader";

export const MyInvitationsList = () => {
  const {
    data: invitations = [],
    isLoading,
    error,
  } = useGetMyInvitationsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Typography color="error">
        Error loading invitations
      </Typography>
    );
  }

  if (invitations.length === 0) {
    return (
      <Typography color="text.secondary">
        You have no invitations.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {invitations.map((invitation) => (
        <UserInvitationCard
          key={invitation.id}
          invitation={invitation}
        />
      ))}
    </Stack>
  );
};
