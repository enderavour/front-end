import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";


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
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default AppModal;
