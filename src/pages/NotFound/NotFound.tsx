import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">
        404
      </Typography>

      <Typography>
        {t("notfound.page")}
      </Typography>
    </Container>
  )
};

export default NotFound;
