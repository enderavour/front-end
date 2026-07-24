import { useState, ChangeEvent } from "react";
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

export const Registration = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [emailError, setEmailError] = useState(false);

  const handleEmailInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target?.value);
    setEmailError(false);
  };

  const handleRegister = () => {

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
        onChange={(e) => handleEmailInput(e)}
        error={emailError}
        helperText={emailError ? t("errors.invalidEmail") : ""}
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
        {t("auth.already_account")}{" "}
        <Link to="/login">
          {t("auth.login")}
        </Link>
      </Typography>

      <SocialAuth />
    </Container>
  );
};
