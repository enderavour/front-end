import { CompanyJoinRequest } from "../../types/CompanyJoinRequest";
import { useAcceptRequestMutation, useRejectRequestMutation } from "../../store/companyApi";
import { Card, CardContent, Typography, Stack, Button } from "@mui/material";

interface Props
{
  request: CompanyJoinRequest;
}

export const CompanyRequestCard = ({
  request
}: Props) => {
  const [acceptRequest, { isLoading: accepting }] = useAcceptRequestMutation();
  const [rejectRequest, { isLoading: rejecting }] = useRejectRequestMutation();

  return (
    <Card>
      <CardContent>
        <Typography>
          {request.user.name}
        </Typography>

        <Stack direction="row">
          <Button onClick={() => { acceptRequest(request.id) }}
            disabled={accepting}
          >
            Accept
          </Button>

          <Button
            color="error"
            onClick={() => { rejectRequest(request.id) }}
            disabled={rejecting}
          >
            Reject
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
