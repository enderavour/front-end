import { Stack } from "@mui/material"
import { Google, GitHub, Facebook } from "@mui/icons-material"
import { IconButton } from "@mui/material";
import { handleGoogleLogin } from "../../utils/googleAuth";

export const SocialAuth = () => {
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{ justifyContent: "center" }}
    >
      <IconButton
        onClick={handleGoogleLogin}
      >
        <Google />
      </IconButton>

      <IconButton
        onClick={() => {}}
      >
        <GitHub />
      </IconButton>

      <IconButton
        onClick={() => {}}
      >
        <Facebook />
      </IconButton>
    </Stack>
  );
};
