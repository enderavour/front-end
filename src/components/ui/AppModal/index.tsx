import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface AppModalProps
{
  open: boolean,
  title: string,
  onClose: () => void,
  children: React.ReactNode;
};


const AppModal = ({
  open, title, onClose, children
}: AppModalProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {t("modal.close")}
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export { AppModal };
