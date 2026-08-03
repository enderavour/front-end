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
import { emailRegex } from "../../utils/regex";
import axiosInstance from "../../api/apiService";
import axios from "axios";
import { Header } from "../../layouts/Header";
import { Alert } from "@mui/material";
import { AddRoutes } from "../../routes/routes";

export const Registration = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState(false);

  const handleRegister = async () => {

    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    try
    {
      await axiosInstance.post("/users/", {
        email,
        username: name,
        password
      });

      navigate(AddRoutes.LOGIN);
    }
    catch (e)
    {
      if (axios.isAxiosError(e))
        setError(e.response?.data?.detail ?? "Registration failed");
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
        error={emailError}
        helperText={emailError ? t("errors.invalidEmail") : ""}
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
        helperText={emailError ? "Enter a valid email" : ""}
        />

        <TextField
            fullWidth
            label={t("registration.password")}
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

      <Typography sx={{ mt: 2 }}>
        {t("auth.already_account")}{" "}
        <Link to="/login">
          {t("auth.login")}
        </Link>
      </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          {t("reg.registration")}
        </Button>

        <SocialAuth />
      </Container>
    </>
  );
};
