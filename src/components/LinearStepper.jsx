import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function LinearStepper({
  steps = [],
  orientation,
  nextText,
  backText,
  finishText,
  reset,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const _steps = steps && steps.length ? steps : [];

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  return (
    <div>
      <Stepper className="" activeStep={activeStep} orientation={orientation}>
        {_steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {step.content}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1
                      ? finishText || "Finish"
                      : nextText || "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {backText || "Back"}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default LinearStepper;
