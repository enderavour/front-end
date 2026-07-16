import { Button, Container, Typography } from '@mui/material';
import { REACT_APP_APP_NAME } from '../../App';

function onButtonPress() {
  window.alert('Welcome to my application!');
}

const Home = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        My React Application
      </Typography>

      <Typography variant="h5" gutterBottom>
        My React Application
      </Typography>

      <Typography variant="h4" gutterBottom>
        {REACT_APP_APP_NAME}
      </Typography>

      <Button variant="contained" onClick={onButtonPress}>
        Get Started
      </Button>
    </Container>
  );
};

export { Home };
