import { Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppModal from "../../components/Common/AppModal/AppModal";
import ReduxDemo from "../../components/ReduxDemo/ReduxDemo";

const About = () => {
  const [open, setOpen] = useState<boolean | undefined>();
  const { t } = useTranslation();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">
        {t("about.title")}
      </Typography>

      <Typography variant="body1">
        {t("about.description")}
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        {t("about.modal")}
      </Button>

      <AppModal
        open={open as boolean}
        title="About Project"
        onClose={() => setOpen(false)}
      >
        <Typography>
          {t("about.text")}
        </Typography>
      </AppModal>
      <ReduxDemo/>
    </Container>
  )
};

export default About;
