import { Button, Stack, Typography } from "@mui/material";
import { AppModal } from "../ui/AppModal";
import { useLeaveCompanyMutation } from "../../store/companyApi";
import { useNavigate } from "react-router-dom";
import { AddRoutes } from "../../routes/routes";

interface Props
{
  open: boolean;
  onClose: () => void;
  companyId: number;
};

export const LeaveCompanyModal = ({
  open,
  onClose,
  companyId
}: Props) => {
  const navigate = useNavigate();
  const [leaveCompany, { isLoading }] = useLeaveCompanyMutation();

  const handleLeave = async () => {
    try {
      await leaveCompany(companyId).unwrap();

      onClose();
      navigate(AddRoutes.COMPANIES);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppModal
      open={open}
      onClose={isLoading ? () => { } : onClose}
      title="Leave company"
    >
      <Typography>
        Are you sure you want to leave this company?
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{ pt: 3 }}
      >
        <Button
          color="error"
          variant="contained"
          onClick={handleLeave}
          disabled={isLoading}
        >
          {isLoading ? "Leaving..." : "Leave"}
        </Button>

        <Button
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </Stack>
    </AppModal>
  )
}
