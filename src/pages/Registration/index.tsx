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

const Registration = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [emailError, setEmailError] = useState(false);

  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t("reg.registration")}
      </Typography>

      <TextField
        fullWidth
        label="Name"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
        helperText={emailError ? "Enter a valid email" : ""}
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
        Already have an account?{" "}
        <Link to="/login">
          {t("auth.login")}
        </Link>
      </Typography>

      <SocialAuth />
    </Container>
  );
};

export { Registration };
