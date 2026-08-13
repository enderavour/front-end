import { Card, CardContent, Stack, Typography, Button } from "@mui/material";
import { useState } from "react";

import { CompanyJoinRequest } from "../../types/CompanyJoinRequest";
import { useCancelRequestMutation } from "../../store/companyApi";
import { ConfirmModal } from "../ui/ConfirmModal";

interface UserRequestCardProps
{
  request: CompanyJoinRequest;
}

export const UserRequestCard = ({
  request
}: UserRequestCardProps) => {
  const [openCancel, setOpenCancel] = useState(false);
  const [cancelRequest, { isLoading }] = useCancelRequestMutation();

  const handleCancel = async () => {
    try {
      await cancelRequest(request.id).unwrap();
      setOpenCancel(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h6">
              {request.company_name}
            </Typography>

            <Typography color="text.secondary">
              Status: {request.status}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Sent:{" "}
              {new Date(request.created_at).toLocaleDateString()}
            </Typography>

            {request.status === "pending" && (
              <Button
                color="error"
                variant="contained"
                onClick={() => setOpenCancel(true)}
                disabled={isLoading}
              >
                Cancel request
              </Button>
            )}

          </Stack>
        </CardContent>
      </Card>

      <ConfirmModal
        open={openCancel}
        title="Cancel request"
        message={`Are you sure you want to cancel your request to join ${request.company_name}?`}
        confirmText="Cancel request"
        cancelText="Keep request"
        loading={isLoading}
        onConfirm={handleCancel}
        onClose={() => setOpenCancel(false)}
      />
    </>
  );
};
