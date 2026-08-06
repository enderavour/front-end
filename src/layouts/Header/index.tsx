import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import { LanguageSelect } from "../../components/ui/LanguageSelect";
import { useTranslation } from "react-i18next";
import { useLogout } from "../../hooks/logout";

export const Header = () => {
  const { t } = useTranslation();
  const handleLogout = useLogout();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Meduzzen Internship
        </Typography>
        <Box sx={{ ml: "auto" }}>
            <LanguageSelect/>
        </Box>
        <Button variant="contained" onClick={handleLogout}>
          {t("logout")}
        </Button>
      </Toolbar>
    </AppBar>
  )
};
