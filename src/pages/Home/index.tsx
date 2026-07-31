import { Container, Typography } from '@mui/material';
import { REACT_APP_APP_NAME } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { healthCheck } from '../../api/health';

export const Home = () => {
  const { t } = useTranslation();

  useEffect(() => {
    healthCheck()
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        {t("home.title")}
      </Typography>

      <Typography variant="h4" gutterBottom>
        {REACT_APP_APP_NAME}
      </Typography>

    </Container>
  );
};
