import { useEffect, useState } from "react";
import { healthCheck } from "../../api/health";
import { Snackbar, Alert } from "@mui/material";

export const HealthStatus = () => {
  const [open, setOpen] = useState(false);
  const [success] = useState(true);
  const [message] = useState("");

  useEffect(() => {
    healthCheck()
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
  });

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        severity={success ? "success" : "error"}
        variant="filled"
        onClose={() => setOpen(false)}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
