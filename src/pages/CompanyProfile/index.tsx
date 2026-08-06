import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetCompanyByIdQuery } from "../../store/companyApi";
import { Loader } from "../../components/ui/Loader";

export const CompanyProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const companyId = Number(id);

  const {
    data: company,
    isLoading,
    error,
  } = useGetCompanyByIdQuery(companyId);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !company) {
    return (
      <Container sx={{ pt: 4 }}>
        <Typography variant="h4">
          {t("notfound.company")}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h3">
        {t("profile.name")}: {company.name}
      </Typography>

      <Typography>
        {t("profile.description")}: {company.description}
      </Typography>

      <Typography>
        {t("profile.visible")}:{" "}
        {company.is_visible
          ? t("company_is_visible.yes")
          : t("company_is_visible.no")}
      </Typography>
    </Container>
  );
};
