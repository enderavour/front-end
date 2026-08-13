import { CompanyInvitation } from "../../types/CompanyInvitation";
import { useCancelInvitationMutation } from "../../store/companyApi";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface Props
{
  invitation: CompanyInvitation;
};

export const InvitedUserCard = ({
  invitation
}: Props) => {
  const [cancelInvitation, { isLoading }] = useCancelInvitationMutation();

  const handleCancel = async () => {
    await cancelInvitation(invitation.id).unwrap();
  };

  return (
    <Card>
      <CardContent>
        <Typography>
          {invitation.receiver.name}
        </Typography>

        <Typography>
          {invitation.receiver.email}
        </Typography>

        <Button
          color="error"
          disabled={isLoading}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  )
}
