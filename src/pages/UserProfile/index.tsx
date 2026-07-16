import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { users } from "../../mocks/users";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const user = users.find(
    (user) => user.id === Number(id)
  );

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4">
          {t("notfound.user")}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">
        {user.name}
      </Typography>

      <Typography>
        {t("userprofile.email")}: {user.email}
      </Typography>

      <Typography>
        {t("userprofile.company")}: {user.company}
      </Typography>
    </Container>
  );
};

export { UserProfile };
