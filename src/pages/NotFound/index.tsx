import { Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">
        404
      </Typography>

      <Typography>
        Page not found.
      </Typography>
    </Container>
  )
};

export { NotFound };
