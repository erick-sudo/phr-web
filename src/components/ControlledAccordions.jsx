import React, { useState } from "react";
import { AccordionSummary, Accordion, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ControlledAccordions({ items = [], className = "" }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={`${className}`}>
      {items.map((item, idx) => (
        <Accordion
          key={idx}
          expanded={expanded === `panel${idx}`}
          onChange={handleChange(`panel${idx}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${idx}content`}
            id={`panel${idx}header`}
          >
            {item["summary"]}
          </AccordionSummary>
          <AccordionDetails>{item["details"]}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default ControlledAccordions;
