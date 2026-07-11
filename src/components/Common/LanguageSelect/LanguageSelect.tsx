import { Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: any) => {
    const language = event.target.value;

    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      size="small"
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="uk">Українська</MenuItem>
    </Select>
  )
}

export default LanguageSelect;
