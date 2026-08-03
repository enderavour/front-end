import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import { LanguageSelect } from "../../components/ui/LanguageSelect";
import { useLogout } from "../../hooks/logout";

export const Header = () => {
  const logout = useLogout();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Meduzzen Internship
        </Typography>
        <Box sx={{ ml: "auto" }}>
            <LanguageSelect/>
        </Box>
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
};
