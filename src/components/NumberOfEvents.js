// src/components/NumberOfEvents.js

import React, { useState, useEffect } from "react";
import { Form, InputGroup, Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [inputValue, setInputValue] = useState("32");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const numberValue = Number(value);

    if (isNaN(numberValue) || !Number.isInteger(numberValue)) {
      setErrorAlert("Please enter a valid integer for the number of events.");
    } else if (numberValue <= 0) {
      setErrorAlert("Please enter a positive number for the number of events.");
    } else if (numberValue > 250) {
      setErrorAlert("Maximum number of events is 250. Please enter a smaller number.");
    } else {
      setErrorAlert("");
      setCurrentNOE(numberValue);
    }
  };

  const handleClear = () => {
    setInputValue("32");
    setCurrentNOE(Number("32"));
    setErrorAlert("");
  };

  const resetTooltip = (props) => (
    <Tooltip id="reset-tooltip" {...props} className="bordered-tooltip" data-testid="bordered-tooltip">
      Reset to default value (32)
    </Tooltip>
  );

  return (
    <Row className="align-items-center justify-content-center w-100">
      <Col xs="auto">
        <InputGroup
          id="number-of-events"
          data-testid="number-of-events"
          className="align-items-center"
        >
          <Form.Label htmlFor="number-of-events" className="labelNOE me-2">
            Number of Events:
          </Form.Label>
          <Form.Control
            id="number-of-events"
            type="text"
            className="number-of-events number-of-events-input me-2"
            style={{ width: "70px", textAlign: "center" }}
            aria-label="Number of Events"
            data-testid="number-of-events-input"
            value={inputValue}
            onChange={handleInputChanged}
            onClick={(e) => e.target.select()}
            onFocus={(e) => e.target.select()}
            placeholder="Enter number of events"
          />
          <OverlayTrigger
            placement="top"
            delay={{ show: 50, hide: 400 }}
            overlay={resetTooltip}
            show={isMobile ? true : undefined}
            className="resetTooltip"
          >
            <i
              className="bi bi-arrow-clockwise buttonReset"
              onClick={handleClear}
              role="img"
              aria-label="Reset number of events"
              alt-text="Reset number of events"
              style={{
                fontSize: "1.5rem",
                color: "cornflowerblue",
                cursor: "pointer",
              }}
            />
          </OverlayTrigger>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default NumberOfEvents;
