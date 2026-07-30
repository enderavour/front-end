import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchCompanies } from "../../store/companySlice";
import { useState, useEffect } from "react";
import { Grid } from "@mui/system";
import { PagePagination } from "../../components/Pagination";
import { Box } from "@mui/material";
import { CompanyCard } from "../../components/Company/CompanyCard";
import { Company } from "../../types/Company";
import { Button, Typography } from "@mui/material";
import { CreateCompanyModal } from "../../components/Company/CreateCompanyModal";
import { EditCompanyModal } from "../../components/Company/EditCompanyModal";
import { DeleteCompanyModal } from "../../components/Company/DeleteCompanyModal";

export const Companies = () => {
  const { t } = useTranslation();
  const dispatch  = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { companies, total, loading, error } = useAppSelector((state) => state.companies);

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

  useEffect(() => {
    dispatch(fetchCompanies({
      skip: (page - 1) * limit,
      limit
    }));
  }, [dispatch, page, limit]);

  const totalPages = Math.ceil(total / limit);

  const currentUserId = useAppSelector(
    (state) => state.auth.userId
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%"
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
        {
          companies?.length === 0 && (
            <Typography
              variant="h6"
              sx={{
                mt: 5,
                textAlign: "center"
              }}
            >
              No companies yet
            </Typography>
          )
        }

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

      <EditCompanyModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        company={selectedCompany}
      />

      <DeleteCompanyModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        company={selectedCompany}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <PagePagination
          page={page}
          totalPages={totalPages}
          onChange={(newPage) => setPage(newPage)}
        />
      </Box>
    </>
  );
};
