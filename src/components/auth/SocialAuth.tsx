import { Stack } from "@mui/material"
import { Google, GitHub, Facebook } from "@mui/icons-material"

const SocialAuth = () => {
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{ justifyContent: "center" }}
    >
      <Google />
      <GitHub />
      <Facebook />
    </Stack>
  );
};

export { SocialAuth };
