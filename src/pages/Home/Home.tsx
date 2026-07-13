import { Button, Container, Typography } from '@mui/material';
import { REACT_APP_APP_NAME } from '../../App';
import { useTranslation } from 'react-i18next';
import { healthCheck } from '../../api/health';
import { useEffect } from "react";

function onButtonPress() {
  window.alert('Welcome to my application!');
}

const Home = () => {
  const { t } = useTranslation();

  useEffect(() => {
    healthCheck()
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        {t("home.title")}
      </Typography>

      <Typography variant="h4" gutterBottom>
        {REACT_APP_APP_NAME}
      </Typography>

      <Button variant="contained" onClick={onButtonPress}>
        {t("home.begin")}
      </Button>
    </Container>
  );
};

export default Home;
