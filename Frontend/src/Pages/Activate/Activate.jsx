import React, { useState } from "react";
import styles from "./Activate.module.css";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import Card from "../../Components/SharedComponents/Card/Card";
const stpes = {
  1: StepName,
  2: StepAvatar,
};
const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = stpes[step];
  const onClick = () => {
    setStep((prev) => prev + 1);
  };
  return <Step onClick={onClick} />;
};

export default Activate;
