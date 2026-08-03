import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AddRoutes } from "../../routes/routes";

const navigationItems = [
  { label: "navigation.home", path: AddRoutes.ROOT },
  { label: "navigation.about", path: AddRoutes.ABOUT },
  { label: "navigation.users", path: AddRoutes.USERS },
  { label: "navigation.companies", path: AddRoutes.COMPANIES }
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
