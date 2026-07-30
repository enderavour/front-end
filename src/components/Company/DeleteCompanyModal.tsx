import { Company } from "../../types/Company";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteCompany } from "../../store/companySlice";
import { AppModal } from "../ui/AppModal";
import { Typography, Stack, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeleteCompanyProps
{
  open: boolean;
  company: Company | null;
  onClose: () => void;
};

export const DeleteCompanyModal = ({
  open,
  company,
  onClose
}: DeleteCompanyProps) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const handleDelete = async () => {
    if (!company) return;

    await dispatch(deleteCompany(company.id));

    onClose();
  }

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={t("delete_modal.delete_title")}
    >

      <Typography>
        {t("delete_modal.delete_confirmation")} {company?.name}?
      </Typography>


      <Stack direction="row" spacing={2}>

        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
        >
          {t("delete_modal.delete")}
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
