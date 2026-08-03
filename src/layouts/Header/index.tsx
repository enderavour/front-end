import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import { LanguageSelect } from "../../components/ui/LanguageSelect";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { logout } from "../../store/authSlice";
import { clearAuth } from "../../utils/authStorage";
import { useTranslation } from "react-i18next";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    clearAuth();
    navigate("/login");
  };

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
