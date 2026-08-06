import { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { SocialAuth } from "../../components/auth/SocialAuth";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../api/apiService";
import { Header } from "../../layouts/Header";
import { Alert } from "@mui/material";
import axios from "axios";
import { validateAuthForm } from "../../utils/validateAuth";
import { AddRoutes } from "../../routes/routes";

export const Registration = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleRegister = async () => {
    setError("");

    const { emailValid, passwordValid } = validateAuthForm(email, password);

    if (!emailValid) {
      setEmailError(true);
      return;
    }

    if (!passwordValid)
    {
      setPasswordError(true);
      return;
    }

    try
    {
      await axiosInstance.post(AddRoutes.USERS, {
        email,
        username: name,
        password
      });

      navigate(AddRoutes.LOGIN);
    }
    catch (e)
    {
      if (axios.isAxiosError(e))
        setError(e.response?.data?.detail ?? t("errors.regFailed"));
      else
        setError("Unknown error");
    }
  };

  return (
    <>
      <Header/>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("reg.registration")}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label={t("registration.name")}
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label={t("registration.email")}
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
          error={emailError}
          helperText={emailError ? t("errors.invalidEmail") : ""}
        />

        <TextField
          fullWidth
          label={t("registration.password")}
          type="password"
          margin="normal"
          error={passwordError}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          {t("reg.registration")}
        </Button>

        <Typography sx={{ mt: 2 }}>
          {t("reg.have_account")}{" "}
          <Link to="/login">
            {t("auth.login")}
          </Link>
        </Typography>

        <SocialAuth />
      </Container>
    </>
  );
};
