import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Users = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">
        {t("users.title")}
      </Typography>
    </Container>
  )
};

export default Users;
