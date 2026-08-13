import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import { CompanyInvitation } from "../../types/CompanyInvitation";

import {
  useAcceptInvitationMutation,
  useDeclineInvitationMutation,
} from "../../store/companyApi";

import { AppModal } from "../ui/AppModal";

interface Props {
  invitation: CompanyInvitation;
}

export const UserInvitationCard = ({
  invitation,
}: Props) => {
  const [openDecline, setOpenDecline] = useState(false);

  const [
    acceptInvitation,
    { isLoading: isAccepting },
  ] = useAcceptInvitationMutation();

  const [
    declineInvitation,
    { isLoading: isDeclining },
  ] = useDeclineInvitationMutation();

  const handleAccept = async () => {
    try {
      await acceptInvitation(invitation.id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async () => {
    try {
      await declineInvitation(invitation.id).unwrap();
      setOpenDecline(false);
    } catch (error) {
      console.error(error);
    }
  };

  const isLoading = isAccepting || isDeclining;

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2}>

            <Typography variant="h6">
              Company #{invitation.company_id}
            </Typography>

            <Typography color="text.secondary">
              Status: {invitation.status}
            </Typography>

            {invitation.status === "pending" && (
              <Stack
                direction="row"
                spacing={2}
              >
                <Button
                  variant="contained"
                  onClick={handleAccept}
                  disabled={isLoading}
                >
                  {isAccepting
                    ? "Accepting..."
                    : "Accept"}
                </Button>

                <Button
                  color="error"
                  variant="contained"
                  onClick={() => setOpenDecline(true)}
                  disabled={isLoading}
                >
                  Decline
                </Button>
              </Stack>
            )}

          </Stack>
        </CardContent>
      </Card>

      <AppModal
        open={openDecline}
        title="Decline invitation"
        onClose={() => {
          if (!isLoading) {
            setOpenDecline(false);
          }
        }}
      >
        <Typography>
          Are you sure you want to decline this invitation?
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3 }}
        >
          <Button
            color="error"
            variant="contained"
            onClick={handleDecline}
            disabled={isLoading}
          >
            {isDeclining
              ? "Declining..."
              : "Decline"}
          </Button>

          <Button
            onClick={() => setOpenDecline(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </Stack>
      </AppModal>
    </>
  );
};
