import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/hooks";
import { useState } from "react";
import { Grid } from "@mui/system";
import { Box } from "@mui/material";
import { CompanyCard } from "../../components/Company/CompanyCard";
import { Company } from "../../types/Company";
import { Button, Typography } from "@mui/material";
import { CreateCompanyModal } from "../../components/Company/CreateCompanyModal";
import { EditCompanyModal } from "../../components/Company/EditCompanyModal";
import { DeleteCompanyModal } from "../../components/Company/DeleteCompanyModal";
import { Loader } from "../../components/ui/Loader";
import { useGetCompaniesQuery } from "../../store/companyApi";
import { Pagination } from "@mui/material";

export const Companies = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const limit = 10;

  const currentUserId = useAppSelector(
    (state) => state.auth.userId
  );

  const {
    data,
    isLoading,
    error
  } = useGetCompaniesQuery({
    skip: (page - 1) * limit,
    limit
  });

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setOpenEdit(true);
  };

  const handleDelete = (company: Company) => {
    setSelectedCompany(company);
    setOpenDelete(true);
  };

  const companies = data?.companies ?? [];
  const total = data?.total ?? 0;

  const totalPages = Math.ceil(total / limit);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          pb: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setOpenCreate(true)}
        >
          {t("company_card.create_company")}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {companies?.length === 0 && (
          <Grid size={12}>
            <Typography
              variant="h6"
              sx={{
                pt: 5,
                textAlign: "center",
              }}
            >
              No companies yet
            </Typography>
          </Grid>
        )}

        {companies?.map((company) => (
          <Grid
            key={company.id}
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <CompanyCard
              company={company}
              currentUserId={currentUserId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <CreateCompanyModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />

      {selectedCompany && (
        <EditCompanyModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          company={selectedCompany}
        />
      )}

      {selectedCompany && (
        <DeleteCompanyModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          company={selectedCompany}
        />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 3,
        }}
      >
        <Pagination
          page={page}
          count={totalPages}
          onChange={(_, newPage) => setPage(newPage)}
        />
      </Box>
    </>
  );
};
