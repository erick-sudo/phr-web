import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  StepConnector,
  stepConnectorClasses,
  InputAdornment,
  IconButton,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  ListItemText,
  FormControl,
  Stack,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  ArrowLongLeftIcon,
  LockClosedIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import {
  FolderSharedOutlined,
  AccountCircleOutlined,
  SafetyDividerOutlined,
  SubdirectoryArrowLeftOutlined,
  VisibilityOff,
  Visibility,
  MailOutlineOutlined,
  ChevronRightOutlined,
  ChevronLeftOutlined,
} from "@mui/icons-material";
import clsx from "clsx";
import styled from "@emotion/styled";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = {
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
  standardTextField: {
    "& label.Mui-focused": {
      color: "rgb(6, 95, 70)",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgb(6, 95, 70)",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "rgb(6, 95, 70)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(6, 95, 70)",
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

export function SignupStepIconComponent({ active, completed, icon }) {
  const icons = {
    1: <AccountCircleOutlined />,
    2: <FolderSharedOutlined />,
    3: <SafetyDividerOutlined />,
    4: <SubdirectoryArrowLeftOutlined />,
  };

  return (
    <div
      className={clsx(
        "relative -translate-x-3 flex items-center justify-center rounded-full",
        {
          "bg-gradient-to-tl from-emerald-950 to-emerald-400 text-white max-h-10 max-w-10 min-h-10 min-w-10 m-2":
            active,
          "bg-gradient-to-tl from-emerald-950 to-emerald-400 text-white max-h-14 max-w-14 min-h-14 min-w-14":
            completed,
          "bg-gradient-to-tl from-gray-950 to-gray-400 text-white max-h-14 max-w-14 min-h-14 min-w-14":
            !active && !completed,
        }
      )}
    >
      <div
        className={clsx("", {
          "block absolute -inset-2 border-1 rounded-full border-emerald-700":
            active,
        })}
      ></div>
      {icons[icon + ""]}
    </div>
  );
}

const SignupStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {},
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {},
  },
  [`& .${stepConnectorClasses.line}`]: {},
  "&.MuiStepConnector-vertical .MuiStepConnector-line": {
    display: "none !important",
  },
}));

export default function SignUp() {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [accountClass, setAccountClass] = useState("personal");
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      name: "",
      relationship: "",
      phone: "",
      email: "",
    },
  ]);

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  const handleAccountCreation = (e) => {
    e.preventDefault();

    setActiveStep(1);
  };

  return (
    <div className="scroll_y">
      <Container maxWidth="xl" className="py-8">
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel
              sx={{
                "& .Mui-active, .Mui-completed": {
                  color: "rgb(6, 95, 70)",
                },
              }}
              StepIconComponent={SignupStepIconComponent}
            >
              Create Account
            </StepLabel>
            <StepContent>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="grid gap-4 items-center py-8">
                  <Avatar sx={styles.avatar}>
                    <LockClosedIcon height={30} />
                  </Avatar>
                  <Typography
                    className="text-center"
                    component="h1"
                    variant="h5"
                  >
                    Open account
                  </Typography>
                  <form onSubmit={handleAccountCreation} className="grid gap-4">
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          sx={styles.textField}
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          sx={styles.textField}
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lname"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          sx={styles.textField}
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
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
                      </Grid>
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
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
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
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={styles.submit}
                    >
                      Sign Up
                    </Button>
                    <Grid container>
                      <NavLink
                        className="hover:text-emerald-800 text-emerald-600 text-center mt-4 mx-auto"
                        to="/"
                        variant="body2"
                      >
                        Already have an account? Sign in
                      </NavLink>
                    </Grid>
                  </form>
                </div>
              </Container>
            </StepContent>
          </Step>
          <Step>
            <StepLabel
              sx={{
                "& .Mui-active, .Mui-completed": {
                  color: "rgb(6, 95, 70)",
                },
              }}
              StepIconComponent={SignupStepIconComponent}
            >
              Personal Information
            </StepLabel>
            <StepContent>
              <Container component="main">
                <IconButton
                  onClick={() => setActiveStep(0)}
                  sx={{
                    color: "rgb(6, 95, 70)",
                    "&:hover": {
                      color: "rgb(9, 153, 112)",
                    },
                  }}
                >
                  <ArrowLongLeftIcon height={32} />
                </IconButton>
                <form className="grid gap-4 py-4 px-2">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="standard"
                        sx={styles.standardTextField}
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        variant="standard"
                        sx={styles.standardTextField}
                        fullWidth
                        id="middlename"
                        label="Middle Name"
                        name="middlename"
                        autoComplete="mname"
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={4}>
                      <TextField
                        variant="standard"
                        sx={styles.standardTextField}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    variant="standard"
                    sx={styles.standardTextField}
                    required
                    fullWidth
                    id="city"
                    label="National Identity Number/ Passport"
                    name="city"
                    autoComplete="city"
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <DatePicker
                        className="w-full"
                        fullWidth
                        required
                        label="Date of Birth"
                        sx={styles.textField}
                        disablePast
                        views={["year", "month", "day"]}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl required fullWidth sx={styles.textField}>
                        <InputLabel id="demo-multiple-checkbox-label">
                          Gender
                        </InputLabel>
                        <Select
                          value=""
                          input={<OutlinedInput label="Gender" />}
                          MenuProps={MenuProps}
                        >
                          <MenuItem disabled value="">
                            <ListItemText primary={"Select"} />
                          </MenuItem>
                          <MenuItem value="Male">
                            <ListItemText primary={"Male"} />
                          </MenuItem>
                          <MenuItem value="Female">
                            <ListItemText primary={"Female"} />
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Stack className="">
                    <Typography>Emergency Contacts</Typography>
                    <div>
                      {emergencyContacts.map((contact, index) => (
                        <div>
                          <EmergencyContactForm contact={contact} key={index} />
                          <div>
                            <IconButton />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() =>
                        setEmergencyContacts((p) => [
                          ...p,
                          { name: "", email: "", phone: "", relationship: "" },
                        ])
                      }
                      className="w-max px-4"
                      startIcon={<PlusIcon height={24} />}
                      type="button"
                      variant="contained"
                      color="primary"
                      sx={{ ...styles.submit }}
                    >
                      Add
                    </Button>
                  </Stack>
                  <Stack gap={2}>
                    <Typography>Residence</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          variant="standard"
                          sx={styles.standardTextField}
                          required
                          fullWidth
                          id="address"
                          label="Address"
                          name="address"
                          autoComplete="address"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          variant="standard"
                          sx={styles.standardTextField}
                          required
                          fullWidth
                          id="city"
                          label="City"
                          name="city"
                          autoComplete="city"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          variant="standard"
                          sx={styles.standardTextField}
                          required
                          fullWidth
                          id="state"
                          label="State"
                          name="state"
                          autoComplete="state"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          variant="standard"
                          sx={styles.standardTextField}
                          required
                          fullWidth
                          id="postal_code"
                          label="Postal Code"
                          name="postal_code"
                          autoComplete="postal_code"
                        />
                      </Grid>
                    </Grid>
                  </Stack>

                  <Divider />

                  <div className="py-4">
                    <FormControl fullWidth sx={styles.textField}>
                      <InputLabel id="marital_status">
                        Marital Status
                      </InputLabel>
                      <Select
                        value=""
                        input={<OutlinedInput label="Marital Status" />}
                        MenuProps={MenuProps}
                      >
                        <MenuItem disabled value="">
                          <ListItemText primary={"Select"} />
                        </MenuItem>
                        <MenuItem value="Single">
                          <ListItemText primary={"Single"} />
                        </MenuItem>
                        <MenuItem value="Married">
                          <ListItemText primary={"Married"} />
                        </MenuItem>
                        <MenuItem value="Divorced">
                          <ListItemText primary={"Divorced"} />
                        </MenuItem>
                        <MenuItem value="Widowed">
                          <ListItemText primary={"Widowed"} />
                        </MenuItem>
                        <MenuItem value="Other">
                          <ListItemText primary={"Other"} />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="py-4">
                    <FormControl fullWidth sx={styles.textField}>
                      <InputLabel id="language">
                        Preferred language for communication and documentation
                      </InputLabel>
                      <Select
                        value=""
                        input={
                          <OutlinedInput label="Preferred language for communication and documentation" />
                        }
                        MenuProps={MenuProps}
                      >
                        <MenuItem disabled value="">
                          <ListItemText primary={"Select"} />
                        </MenuItem>
                        <MenuItem value="English">
                          <ListItemText primary={"English"} />
                        </MenuItem>
                        <MenuItem value="Swahili">
                          <ListItemText primary={"Swahili"} />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      startIcon={<ChevronLeftOutlined height={24} />}
                      type="button"
                      variant="contained"
                      color="primary"
                      sx={{ ...styles.submit }}
                      onClick={() => setActiveStep(0)}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => setActiveStep(2)}
                      endIcon={<ChevronRightOutlined height={24} />}
                      type="button"
                      variant="contained"
                      color="primary"
                      sx={{ ...styles.submit }}
                    >
                      Next
                    </Button>
                  </div>
                </form>
              </Container>
            </StepContent>
          </Step>
          <Step>
            <StepLabel
              sx={{
                "& .Mui-active, .Mui-completed": {
                  color: "rgb(6, 95, 70)",
                },
              }}
              StepIconComponent={SignupStepIconComponent}
            >
              Classify Account
            </StepLabel>
            <StepContent>
              <Container className="p-4" component="main">
                <IconButton
                  onClick={() => setActiveStep(1)}
                  sx={{
                    color: "rgb(6, 95, 70)",
                    "&:hover": {
                      color: "rgb(9, 153, 112)",
                    },
                  }}
                >
                  <ArrowLongLeftIcon height={32} />
                </IconButton>
                <div className="px-6">
                  <div>
                    <RadioGroup
                      onChange={(e) => {
                        setAccountClass(e.target.value);
                      }}
                      name="account_class"
                      value={accountClass}
                      row
                    >
                      <FormControlLabel
                        value="personal"
                        control={<Radio sx={{ ...styles.customCheckbox }} />}
                        label="Personal Account"
                      />
                      <FormControlLabel
                        value="practitioner"
                        control={<Radio sx={{ ...styles.customCheckbox }} />}
                        label="Medical Practitioner"
                      />
                    </RadioGroup>
                  </div>

                  <form>
                    {accountClass === "practitioner" && (
                      <DoctorRegistrationForm />
                    )}

                    <div className="py-4 flex justify-between">
                      <Button
                        startIcon={<ChevronLeftOutlined height={24} />}
                        type="button"
                        variant="contained"
                        color="primary"
                        sx={{ ...styles.submit }}
                        onClick={() => setActiveStep(1)}
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={() => setActiveStep(3)}
                        endIcon={<ChevronRightOutlined height={24} />}
                        type="button"
                        variant="contained"
                        color="primary"
                        sx={{ ...styles.submit }}
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                </div>
              </Container>
            </StepContent>
          </Step>
          <Step>
            <StepLabel
              sx={{
                "& .Mui-active, .Mui-completed": {
                  color: "rgb(6, 95, 70)",
                },
              }}
              StepIconComponent={SignupStepIconComponent}
            >
              Finish
            </StepLabel>
            <StepContent>
              <Container component="main">
                <div className="py-4 flex justify-between">
                  <Button
                    startIcon={<ChevronLeftOutlined height={24} />}
                    type="button"
                    variant="contained"
                    color="primary"
                    sx={{ ...styles.submit }}
                    onClick={() => setActiveStep(2)}
                  >
                    Previous
                  </Button>
                  <div className="flex gap-4">
                    <Button
                      onClick={handleReset}
                      type="button"
                      variant="contained"
                      color="primary"
                      sx={{ ...styles.submit, padding: "1em 2em" }}
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={() => {}}
                      type="button"
                      variant="contained"
                      color="primary"
                      sx={{ ...styles.submit, padding: "1em 2em" }}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Container>
            </StepContent>
          </Step>
        </Stepper>
      </Container>
    </div>
  );
}

function EmergencyContactForm({ contact }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={16} md={6}>
        <TextField
          variant="standard"
          sx={styles.standardTextField}
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
        />
      </Grid>
      <Grid item xs={16} md={6}>
        <TextField
          variant="standard"
          sx={styles.standardTextField}
          required
          fullWidth
          id="email"
          label="email"
          name="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={14} md={5}>
        <TextField
          variant="standard"
          sx={styles.standardTextField}
          required
          fullWidth
          id="phone"
          type="number"
          label="Phone"
          name="phone"
          autoComplete="phone"
        />
      </Grid>
      <Grid item xs={10} md={5}>
        <FormControl sx={styles.textField} fullWidth>
          <InputLabel id="relationship_input">Relationship</InputLabel>
          <Select
            value=""
            name="relationship"
            input={<OutlinedInput label="Relationship" />}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <ListItemText primary={"Select"} />
            </MenuItem>
            <MenuItem value="Father">
              <ListItemText primary={"Father"} />
            </MenuItem>
            <MenuItem value="Mother">
              <ListItemText primary={"Mother"} />
            </MenuItem>
            <MenuItem value="Sibling">
              <ListItemText primary={"Sibling"} />
            </MenuItem>
            <MenuItem value="Other">
              <ListItemText primary={"Other"} />
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid className="flex items-center justify-center" item xs={2} md={2}>
        <IconButton>
          <TrashIcon height={32} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

function DoctorRegistrationForm() {
  return (
    <div className="py-4">
      <Typography variant="h5" gutterBottom>
        Profession Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            sx={styles.textField}
            fullWidth
            label="Medical License Number"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={styles.textField}
            fullWidth
            label="Specialty/Area of Practice"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={styles.textField}
            fullWidth
            label="Medical Degree(s) and Qualifications"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={styles.textField}
            fullWidth
            label="Professional Certifications"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={styles.textField}
            fullWidth
            label="Years of Experience"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={styles.textField}
            fullWidth
            label="Practice/Workplace Information"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={styles.textField}
            fullWidth
            label="Languages Spoken"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={styles.textField}
            fullWidth
            label="Research/Publications"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={styles.textField}
            fullWidth
            label="Professional Interests"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={styles.textField}
            fullWidth
            label="Affiliations"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            defaultValue="AMA"
            select
            fullWidth
            label="Membership in Professional Organizations"
            variant="outlined"
            sx={styles.textField}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="AMA">American Medical Association (AMA)</MenuItem>
            <MenuItem value="AAP">
              American Academy of Pediatrics (AAP)
            </MenuItem>
            <MenuItem value="ACS">American College of Surgeons (ACS)</MenuItem>
            {/* Add more options as needed */}
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
}
