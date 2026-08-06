import { Company } from "../../types/Company";
import { AppModal } from "../ui/AppModal";
import { Typography, Stack, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDeleteCompanyMutation } from "../../store/companyApi";

interface DeleteCompanyProps
{
  open: boolean;
  company: Company;
  onClose: () => void;
};

export const DeleteCompanyModal = ({
  open,
  company,
  onClose
}: DeleteCompanyProps) => {
  const { t } = useTranslation();

  const [deleteCompany, { isLoading }] = useDeleteCompanyMutation();

  const handleDelete = async () => {
    try {
      await deleteCompany(company.id).unwrap();
      onClose();
    }
    catch (e) {
      console.error(e);
    }
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={t("delete_modal.delete_title")}
    >

      <Typography>
        {t("delete_modal.delete_confirmation")} {company.name}
      </Typography>


      <Stack direction="row" spacing={2}>

        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading
            ? t("common.deleting")
            : t("delete_modal.delete")
          }
        </Button>


        <Button
          onClick={onClose}
        >
          {t("delete_modal.cancel")}
        </Button>

      </Stack>


    </AppModal>
  );
}
