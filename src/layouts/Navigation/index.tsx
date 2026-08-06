import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navigationItems = [
  { label: "navigation.home", path: "/" },
  { label: "navigation.about", path: "/about" },
  { label: "navigation.users", path: "/users" },
  { label: "navigation.companies", path: "/companies" }
];

export const Navigation = () => {
  const { t } = useTranslation();

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
          {t(item.label)}
        </Button>
      ))}
      </Box>
  )
}
