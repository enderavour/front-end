import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { login } from "../../store/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, Typography, Container } from "@mui/material";
import { SocialAuth } from "../../components/auth/SocialAuth";
import { saveAuth } from "../../utils/authStorage";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../api/apiService";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

      dispatch(login(authData));

      saveAuth(
        authData.token,
        authData.expiresAt,
        authData.userId
      );

      navigate(from, { replace: true });
    }
    catch (e)
    {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t("auth.login")}
      </Typography>

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(false);
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
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        {t("auth.login")}
      </Button>

      <Typography sx={{ mt: 2 }}>
        {t("auth.no_account")}{" "}
        <Link to="/register">
          {t("auth.register")}
        </Link>
      </Typography>

      <SocialAuth />
    </Container>
  );
};

export { Login };
