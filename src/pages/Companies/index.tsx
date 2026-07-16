import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";


const Companies = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">
        {t("companies.title")}
      </Typography>
    </Container>
  )
};

export { Companies };
