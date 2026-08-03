import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { companies } from "../../mocks/companies";
import { useTranslation } from "react-i18next";
import { EntityNotFound } from "../../components/EntityNotFound";

export const CompanyProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const company = companies.find(
    (company) => company.id === Number(id)
  );

  if (!company)
  {
    return <EntityNotFound />;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">
        {t("profile.name")}: {company.name}
      </Typography>

      <Typography>
        {t("profile.email")}: {company.email}
      </Typography>

      <Typography>
        {t("profile.address")}: {company.address}
      </Typography>
    </Container>
  );
};
