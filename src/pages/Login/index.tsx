import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { login } from "../../store/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, Typography, Container, Alert } from "@mui/material";
import { SocialAuth } from "../../components/auth/SocialAuth";
import { setToStorage } from "../../utils/authStorage";
import { useTranslation } from "react-i18next";
import { emailRegex } from "../../utils/regex";
import { AddRoutes } from "../../routes/routes";
import axiosInstance from "../../api/apiService";
import axios from "axios";
import { Header } from "../../layouts/Header";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async () => {

    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    try
    {
      const response = await axiosInstance.post("/auth/signin", {
        email, password
      });

      const {
        access_token,
        user_id
      } = response.data;

      const authData = {
        token: access_token,
        expiresAt: Date.now() + 60 * 60 * 1000,
        userId: user_id
      };

      setToStorage(
        authData.token,
        authData.expiresAt,
        authData.userId
      );

      dispatch(login(authData));

      setToStorage(
        authData.token,
        authData.expiresAt,
        authData.userId
      );

      navigate(from, { replace: true });
    }
    catch (e)
    {
      if (axios.isAxiosError(e))
        setError(e.response?.data?.detail ?? "Login Failed");
      else
        setError("Unknown error");
    }
  };

  return (
    <>
      <Header/>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("auth.login")}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
            fullWidth
            label={t("login.email")}
            margin="normal"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
                setError("");
            }}
            error={emailError}
            helperText={
                emailError
                ? "Enter a valid email"
                : ""
            }
        />

        <TextField
            fullWidth
            label={t("login.password")}
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setError("");
            }}
        />


      <Button
        fullWidth
        variant="contained"
        onClick={handleLogin}
        sx={{ pt: 2 }}
      >
        {t("auth.login")}
      </Button>

      <Typography sx={{ pt: 2 }}>
        {t("auth.no_account")}{" "}
        <Link to={AddRoutes.REGISTER}>
          {t("auth.register")}
        </Link>
      </Typography>

        <SocialAuth />
      </Container>
    </>
  );
};
