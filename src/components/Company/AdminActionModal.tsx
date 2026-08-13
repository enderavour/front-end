import { AppModal } from "../ui/AppModal";
import { Button, Stack, Typography } from "@mui/material";

interface Props
{
  open: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onConfirm: () => void;
  isLoading: boolean;
};

export const AdminActionModal = ({
  open,
  onClose,
  isAdmin,
  onConfirm,
  isLoading
}: Props) => {
  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={isAdmin ? "Remove admin" : "Make admin"}
    >
      <Stack spacing={2}>
        <Typography>
          {isAdmin
            ? "Are you sure you want to remove administrator role?"
            : "Are you sure you want to appoint administrator role?"
          }
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Comfirm"}
          </Button>

          <Button
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </AppModal>
  );
};
