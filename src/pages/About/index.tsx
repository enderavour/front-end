import { Button, Container, Typography } from "@mui/material";
import { useState } from "react";

import { AppModal } from "../../components/ui/AppModal";

const About = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">
        About
      </Typography>

      <Typography variant="body1">
        This application demonstrates React Router, Material UI and mocked data
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>

      <AppModal
        open={open}
        title="About Project"
        onClose={() => setOpen(false)}
      >
        <Typography>
          This project was created as a part of internship.
        </Typography>
      </AppModal>
    </Container>
  )
};

export { About };
