import { Button, Stack, Typography } from "@mui/material";
import { AppModal } from "../AppModal";

interface ConfirmModalProps
{
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmModal = ({
  open,
  title,
  message,
  confirmText,
  cancelText,
  loading = false,
  onConfirm,
  onClose
}: ConfirmModalProps) => {
  return (
    <AppModal
      open={open}
      title={title}
      onClose={loading ? () => { } : onClose}
    >
      <Typography>
        {message}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{ pt: 3 }}
      >
        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Loading..." : confirmText}
        </Button>

        <Button
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>
      </Stack>
    </AppModal>
  );
};
