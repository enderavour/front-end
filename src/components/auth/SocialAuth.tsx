import { Stack } from "@mui/material"
import { Google, GitHub, Facebook } from "@mui/icons-material"

export const SocialAuth = () => {
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
