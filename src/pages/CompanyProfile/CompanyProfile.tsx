import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { companies } from "../../mocks/companies";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const company = companies.find(
    (company) => company.id === Number(id)
  );

  if (!company) {
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
        {t("userprofile.name")}: {company.name}
      </Typography>

      <Typography>
        {t("userprofile.email")}: {company.email}
      </Typography>

      <Typography>
        {t("userprofile.address")}: {company.address}
      </Typography>
    </Container>
  );
};

export default UserProfile;
