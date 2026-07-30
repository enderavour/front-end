import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../hooks/hooks";
import { useAppSelector } from "../../hooks/hooks";
import { fetchCompanyById } from "../../store/companySlice";
import { useEffect } from "react";

const CompanyProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    selectedCompany,
    loading,
    error
  } = useAppSelector(state => state.companies);

  useEffect(() => {
    if (id)
      dispatch(fetchCompanyById(Number(id)));
  }, [dispatch, id]);

  if (!selectedCompany) {
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
        {t("profile.name")}: {selectedCompany?.name}
      </Typography>

      <Typography>
        {t("profile.description")}: {selectedCompany?.description}
      </Typography>

      <Typography>
        {t("profile.visible")}: {selectedCompany?.is_visible ?
          t("company_is_visible.yes") : t("company_is_visible.no")}
      </Typography>
    </Container>
  );
};

export { CompanyProfile };
