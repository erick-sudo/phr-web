import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { useNavigate } from "react-router";
import { useLogin } from "../hooks/useLogin";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import {
  MailOutlineOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const images = [
  "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125_640.jpg",
  "https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_640.jpg",
  "https://cdn.pixabay.com/photo/2016/10/18/08/52/blood-pressure-monitor-1749577_640.jpg",
];

const styles = {
  root: {
    position: "fixed",
    inset: 0,
  },
  avatar: {
    margin: "auto",
    width: "48px",
    height: "48px",
    backgroundColor: "rgb(6, 95, 70)",
  },
  submit: {
    margin: "3px 0px 2px",
    backgroundColor: "rgb(6, 95, 70)",
    "&:hover": {
      backgroundColor: "rgb(9, 153, 112)",
    },
  },
  customCheckbox: {
    color: "rgb(6, 95, 70)",
    marginRight: "10px",
    "&.Mui-checked": {
      color: "rgb(6, 95, 70)",
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

const SignIn = () => {
  const [loginErrors, setLoginErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [handleLogin] = useLogin();
  const [formData, setFormData] = useState({
    email: "admin@phr.com",
    password: "password",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({
      payload: {
        ...formData,
        grant_type: "user",
      },
      errorCallback: (err) => {
        setLoginErrors(err?.errors);
      },
    });
  }

  return (
    <Grid container component="main" sx={styles.root}>
      <CssBaseline />
      <Grid item sm={4} md={5} className={`hidden sm:block`}>
        <div className="h-full">
          <Swiper
            style={{
              "--swiper-pagination-color": "rgba(7, 189, 137, 1)",
              "--swiper-pagination-bullet-inactive-color":
                "rgba(7, 189, 137, .4)",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-pagination-bullet-size": "20px",
              "--swiper-pagination-bullet-horizontal-gap": "6px",
            }}
            freeMode
            mousewheel
            className="h-full"
            autoplay={{
              delay: 5000,
            }}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            slidesPerView={1}
          >
            {images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <img
                  className="h-full w-full object-cover"
                  src={image}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Grid>
      <Grid
        className="flex justify-center items-center"
        item
        xs={12}
        sm={8}
        md={7}
        component={Paper}
        elevation={6}
      >
        <Container maxWidth="xs" className={`px-4`}>
          <Avatar sx={styles.avatar}>
            <LockClosedIcon height={30} />
          </Avatar>
          <Typography className="text-center" component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} sx={styles.form}>
            <TextField
              value={formData.email}
              onChange={handleChange}
              sx={styles.textField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="email icon" edge="end">
                      <MailOutlineOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              value={formData.password}
              onChange={handleChange}
              sx={styles.textField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
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
            <Grid container>
              <Grid item sm={6} className="flex items-center justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      sx={styles.customCheckbox}
                    />
                  }
                  label="Remember me"
                />
              </Grid>
              <Grid item sm={6} className="flex items-center justify-center">
                <NavLink
                  className="hover:text-emerald-800 text-emerald-600 text-center mx-auto"
                  to="/forgotpassword"
                  variant="body2"
                >
                  Forgot password?
                </NavLink>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={styles.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <NavLink
                className="hover:text-emerald-800 text-emerald-600 text-center mt-4 mx-auto"
                to="/signup"
                variant="body2"
              >
                Don't have an account? Sign Up
              </NavLink>
            </Grid>
          </form>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignIn;
