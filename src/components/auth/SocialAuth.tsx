import { Stack } from "@mui/material"
import { Google, GitHub, Facebook } from "@mui/icons-material"
import { IconButton } from "@mui/material";
import { handleGoogleLogin } from "../../utils/googleAuth";

export const SocialAuth = () => {
  const socialProviders = [
    {
      id: "google",
      icon: Google,
      onClick: handleGoogleLogin,
    },
    {
      id: "github",
      icon: GitHub,
      onClick: () => {},
    },
    {
      id: "facebook",
      icon: Facebook,
      onClick: () => {},
    },
  ];

  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{ justifyContent: "center" }}
    >
      {socialProviders.map(({ id, icon: Icon, onClick }) => (
        <IconButton
          key={id}
          onClick={onClick}
        >
          <Icon />
        </IconButton>
      ))}
    </Stack>
  );
};
