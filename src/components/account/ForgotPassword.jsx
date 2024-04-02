import React, { useState } from "react";
import { Container, TextField, Button, Grid } from "@mui/material";

const styles = {
  submit: {
    margin: "3px 0px 2px",
    backgroundColor: "rgb(6, 95, 70)",
    "&:hover": {
      backgroundColor: "rgb(9, 153, 112)",
    },
  },
  textField: {
    "& label.Mui-focused": {
      color: "rgb(6, 95, 70)",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "rgb(9, 153, 112)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(6, 95, 70)",
      },
    },
  },
};

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submission logic here, e.g., send reset password link to the provided email
    console.log("Email submitted:", email);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="fixed inset-0">
      <div className="container mx-auto px-4 py-12 mt-12 bg-emerald-700/10 rounded-lg">
        <Container>
          <div className="text-center">
            To reset your password, please enter the email address associated
            with your account in the field provided below. Once submitted, we
            will send an email to the provided address with instructions on how
            to reset your password. Please ensure that you have access to the
            email account associated with your account. If you do not receive an
            email within a few minutes, please check your spam folder. If you
            encounter any issues or need further assistance, please contact our
            support team for assistance.
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <TextField
              sx={styles.textField}
              fullWidth
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <div className="flex justify-end">
              <Button sx={styles.submit} type="submit" variant="contained">
                Send Request
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}

function ChangePassword() {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  return (
    <div>
      <Grid item xs={12}>
        <TextField
          sx={styles.textField}
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          id="password"
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          sx={styles.textField}
          required
          fullWidth
          name="confirm_password"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          id="confirm_password"
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </div>
  );
}

export default ForgotPassword;
