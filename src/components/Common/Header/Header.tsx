import { AppBar, Toolbar, Typography, Box } from "@mui/material"
import LanguageSelect from "../LanguageSelect/LanguageSelect";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Meduzzen Internship
        </Typography>
        <Box sx={{ ml: "auto" }}>
            <LanguageSelect/>
        </Box>
      </Toolbar>
    </AppBar>
  )
};

export default Header;
