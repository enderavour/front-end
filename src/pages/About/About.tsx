import { Container, Typography } from "@mui/material";


const About = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">
        About
      </Typography>

      <Typography variant="body1">
        This application demonstrates React Router, Material UI and mocked data
      </Typography>
    </Container>
  )
};

export default About;
