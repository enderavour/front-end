import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
      <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 2,
        }}
      >
        <Button component={NavLink} to="/">
          Home
        </Button>

        <Button component={NavLink} to="/about">
          About
        </Button>

        <Button component={NavLink} to="/users">
          Users
        </Button>

        <Button component={NavLink} to="/companies">
          Companies
        </Button>
      </Box>
  )
}

export default Navigation;
