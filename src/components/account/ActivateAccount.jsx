import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { BoltOutlined, HomeOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { axiosPost } from "../../lib/axiosLib";
import { apis } from "../../lib/apis";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";

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

const ActivateAccount = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resendingCode, setResendingCode] = useState(false);
  const [activated, setActivated] = useState(true);
  const navigate = useNavigate();
  const { snackNotifier } = useContext(AuthContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const expires = parseInt(queryParams.get("expires")) * 1000 || 0;
    if (expires) {
      if (expires - new Date().getTime() < 0) {
        snackNotifier(
          "Your activation token has expired. Please request another.",
          "error",
          "top-center"
        );
      }
    }
  }, []);

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleActivateAccount = () => {
    const token = queryParams.get("token");
    if (token) {
      setVerifying(true);
      axiosPost(apis.verifyEmail, {
        token,
      })
        .then((res) => {
          setVerifying(false);
          snackNotifier("Your account has been activated", "success");
          setActivated(true);
        })
        .catch((axiosError) => {
          setVerifying(false);
          if (axiosError.code === "ERR_NETWORK") {
            snackNotifier(
              "Network error. Please check your internet connection",
              "error",
              "top-center"
            );
          } else {
            if (axiosError.response.status === 404) {
              snackNotifier(
                axiosError.response.data.message,
                "error",
                "top-center"
              );
            } else if (axiosError.response.status === 422) {
              snackNotifier(
                axiosError.response.data.message,
                "error",
                "top-center"
              );
            } else {
              snackNotifier(
                axiosError.response.data.message,
                "error",
                "top-center"
              );
            }
          }
        });
    } else {
      snackNotifier(
        "Something went wrong. We could not fetch your verification token",
        "error",
        "top-center"
      );
    }
  };

  const handleResendVerificationCode = () => {
    setResendingCode(true);
    axiosPost(apis.verificationNotificationResend, {
      email: verificationCode,
    })
      .then((res) => {
        setResendingCode(false);
        snackNotifier(
          "Please check your email, a verification code has been resent that expires after 10 minutes",
          "success"
        );
      })
      .catch((axiosError) => {
        setResendingCode(false);
        if (axiosError.code === "ERR_NETWORK") {
          snackNotifier(
            "Network error. Please check your internet connection",
            "error",
            "top-center"
          );
        } else {
          if (axiosError?.response?.status === 409) {
            snackNotifier(
              axiosError.response.data.message,
              "warning",
              "top-center"
            );
          } else if (axiosError.response.status === 404) {
            snackNotifier(
              axiosError.response.data.message,
              "error",
              "top-center"
            );
          } else if (axiosError.response.status === 422) {
            snackNotifier(
              axiosError.response.data.message,
              "error",
              "top-center"
            );
          }
        }
      });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start px-4 py-8">
      {activated ? (
        <Alert icon={<></>}>
          <Box className="p-8 rounded-md">
            <div className="flex flex-col gap-4">
              <Typography variant="h5" gutterBottom>
                Activate Account
              </Typography>
              <Typography variant="body1" gutterBottom>
                Please enter the verification code sent to your email:
              </Typography>

              <TextField
                fullWidth
                variant="outlined"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                placeholder="Email Address"
                sx={{ ...styles.textField }}
                inputProps={{
                  style: {
                    color: "rgb(6, 95, 70)",
                  },
                }}
              />
              <div className="flex gap-4">
                <LoadingButton
                  size="small"
                  disabled={verificationCode?.length < 1}
                  loading={resendingCode}
                  onClick={handleResendVerificationCode}
                  startIcon={<ArrowPathIcon height={20} />}
                  loadingPosition="start"
                  variant="contained"
                  color="success"
                  className="whitespace-nowrap"
                  sx={{
                    textTransform: "none",
                    paddingRight: "2em",
                    flexGrow: 1,
                  }}
                >
                  {verifying ? "Resending" : "Resend Verification Code"}
                </LoadingButton>
                <LoadingButton
                  size="small"
                  loading={verifying}
                  onClick={handleActivateAccount}
                  startIcon={<BoltOutlined />}
                  loadingPosition="start"
                  variant="contained"
                  color="success"
                  className="whitespace-nowrap"
                  sx={{
                    textTransform: "none",
                    paddingRight: "2em",
                    flexGrow: 1,
                  }}
                >
                  {verifying ? "Verifying" : "Verify"}
                </LoadingButton>
              </div>
            </div>
          </Box>
        </Alert>
      ) : (
        <Alert icon={<></>}>
          <div className="flex flex-col gap-4 p-4">
            <Typography
              className="flex items-center gap-4"
              variant="h5"
              gutterBottom
            >
              <IconButton color="success" onClick={() => navigate("/")}>
                <HomeOutlined />
              </IconButton>
              <div>Account Activated</div>
            </Typography>
            <Typography variant="body1">
              Your account has been successfully activated.You can now login and
              enjoy our services.
            </Typography>
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              sx={{ ...styles.submit }}
              className="w-max mx-auto"
            >
              Proceed to login
            </Button>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default ActivateAccount;
