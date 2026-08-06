import { Stack, Typography, Card, CardContent, CardActions, Button } from "@mui/material";
import { Company } from "../../types/Company";
import { useLeaveCompanyMutation } from "../../store/companyApi";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

interface UserCompanyListProps
{
  companies: Company[];
};

export const UserCompanyList = ({
  companies
}: UserCompanyListProps) => {
  const [leaveCompany, { isLoading }] = useLeaveCompanyMutation();
  const [leavingCompanyId, setLeavingCompanyId] = useState<number | null>(null);

  const { t } = useTranslation();

  const [errorCompanyId, setErrorCompanyId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLeave = async (companyId: number) => {
    try {
        setLeavingCompanyId(companyId);

        await leaveCompany(companyId).unwrap();

        setErrorCompanyId(null);
        setErrorMessage("");
    } catch (err: any) {
        setErrorCompanyId(companyId);
        setErrorMessage(err?.data?.detail ?? t("user_company_list.cannot"));
    } finally {
      setLeavingCompanyId(null);
    }
  };

  if (!companies.length) {
    return (
      <Typography>
        {t("user_company_list.no_companies")}
      </Typography>
    );
  }

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      <Typography variant="h5">
        {t("user_company_list.companies")}
      </Typography>

      {
        companies.map((company) => (
          <Card key={company.id}>

            <CardContent>

              <Typography>
                {company.name}
              </Typography>


              {errorCompanyId === company.id && (
                <Alert severity="error">
                  {errorMessage}
                </Alert>
              )}

            </CardContent>


            <CardActions>
              <Button
                color="error"
                disabled={company.id === leavingCompanyId}
                onClick={() => handleLeave(company.id)}
              >
                {isLoading
                  ? t("common.leaving")
                  : t("user_company_list.leave_company")}
              </Button>
            </CardActions>
          </Card>
        ))
      }
    </Stack>
  )
};
