import { Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

export const EntityNotFound = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h4">
        {t("notfound.company")}
      </Typography>
    </Container>
  );
}
