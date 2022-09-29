import React, { useState } from "react";
import styles from "./StepPhoneEmail.module.css";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onClick }) => {
  const [step, setStep] = useState("phone");
  const Step = phoneEmailMap[step];
  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrap}>
            <button
              className={`${styles.tabButton} ${
                step === "phone" ? styles.active : ""
              }`}
              onClick={() => setStep("phone")}
            >
              <img src="/images/phone-white.png" alt="phone" />
            </button>
            <button
              className={`${styles.tabButton} ${
                step === "email" ? styles.active : ""
              }`}
              onClick={() => setStep("email")}
            >
              <img src="/images/mail-white.png" alt="mail" />
            </button>
          </div>
          <Step onClick={onClick} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
