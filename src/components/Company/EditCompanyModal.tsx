import { Company } from "../../types/Company";
import { useState, useEffect } from "react";
import { Stack, TextField, FormControlLabel, Switch, Button } from "@mui/material";
import { AppModal } from "../ui/AppModal";
import { useTranslation } from "react-i18next";
import { useUpdateCompanyMutation } from "../../store/companyApi";

interface EditModalProps
{
  open: boolean;
  company: Company;
  onClose: () => void;
};

export const EditCompanyModal = ({
  open,
  company,
  onClose
}: EditModalProps) => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);

  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

  useEffect(() => {
    if (company) {
      setName(company.name);
      setDescription(company.description);
      setVisible(company.is_visible);
    }
  }, [company]);

  const handleSave = async () => {
    try
    {
      await updateCompany({
        id: company.id,
        data: {
          name,
          description,
          is_visible: true
        }
      }).unwrap();
      onClose();
    }
    catch (e)
    {
      console.error(e);
    }
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
          disabled={isLoading}
        >
          {isLoading
            ? t("common.saving")
            : t("company_card.save")}
        </Button>

      </Stack>

    </AppModal>
  );
}
