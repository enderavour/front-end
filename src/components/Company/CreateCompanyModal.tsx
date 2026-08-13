import {
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Stack
} from "@mui/material";

import { useState } from "react";
import { AppModal } from "../ui/AppModal";
import { useTranslation } from "react-i18next";
import { useCreateCompanyMutation } from "../../store/companyApi";

interface Props
{
  open: boolean;
  onClose: () => void;
}

export const CreateCompanyModal = ({
  open,
  onClose
}: Props) => {

  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isVisible, setIsVisible] = useState(true);

  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const handleCreate = async () => {
    try
    {
      await createCompany({
        name, description, is_visible: isVisible
      }).unwrap();

      setName("");
      setDescription("");
      setIsVisible(true);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={t("create_modal.create_title")}
    >

      <Stack spacing={2}>

        <TextField
          label={t("create_modal.company_name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


        <TextField
          label={t("create_modal.description")}
          multiline
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />


        <FormControlLabel
          label={t("create_modal.visible")}
          control={
            <Switch
              checked={isVisible}
              onChange={(e) =>
                setIsVisible(e.target.checked)
              }
            />
          }
        />


        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={isLoading || !name.trim()}
        >
          {isLoading
            ? t("common.creating")
            : t("create_modal.create")
          }
        </Button>
      </Stack>

    </AppModal>
  );
};
