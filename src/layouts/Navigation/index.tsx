import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Users", path: "/users" },
  { label: "Companies", path: "/companies" }
];

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
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          component={NavLink}
          to={item.path}
        >
          {item.label}
        </Button>
      ))}
      </Box>
  )
}

export { Navigation };
