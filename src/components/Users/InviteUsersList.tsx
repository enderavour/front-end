import { Stack } from "@mui/material";
import { InvitedUserCard } from "./InvitedUserCard";
import { useGetCompaniesInvitationQuery } from "../../store/companyApi";

interface Props {
  companyId: number;
}

export const InvitedUsersList = ({ companyId }: Props) => {
  const {
    data: invitations = [],
    isLoading,
  } = useGetCompaniesInvitationQuery(companyId);

  console.log("invitations: ", invitations);

  if (isLoading) {
    return null;
  }

  return (
    <Stack spacing={2}>
      {invitations.map((invitation) => (
        <InvitedUserCard
          key={invitation.id}
          invitation={invitation}
        />
      ))}
    </Stack>
  );
};
