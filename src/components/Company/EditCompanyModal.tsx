import { Company } from "../../types/Company";
import { useAppDispatch } from "../../hooks/hooks";
import { useState, useEffect } from "react";
import { updateCompany } from "../../store/companySlice";
import { Stack, TextField, FormControlLabel, Switch, Button } from "@mui/material";
import { AppModal } from "../ui/AppModal";
import { useTranslation } from "react-i18next";

interface EditModalProps
{
  open: boolean;
  company: Company | null;
  onClose: () => void;
};

export const EditCompanyModal = ({
  open,
  company,
  onClose
}: EditModalProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (company) {
      setName(company.name);
      setDescription(company.description);
      setVisible(company.is_visible);
    }
  }, [company]);

  const handleSave = async () => {
    if (!company) return;

    await dispatch(updateCompany({
      id: company.id,
      data: { name, description, is_visible: true }
    }));

    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={t("company_card.edit_company")}
    >

      <Stack spacing={2}>

        <TextField
          label={t("company_card.label_name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label={t("company_card.label_description")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />


        <FormControlLabel
          label={t("company_card.label_visible")}
          control={
            <Switch
              checked={visible}
              onChange={(e) =>
                setVisible(e.target.checked)
              }
            />
          }
        />


        <Button
          variant="contained"
          onClick={handleSave}
        >
          {t("company_card.save")}
        </Button>

      </Stack>

    </AppModal>
  );
}
