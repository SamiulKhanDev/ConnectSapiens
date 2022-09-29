import React, { useState } from "react";
import Card from "../../../../Components/SharedComponents/Card/Card";
import Button from "../../../../Components/SharedComponents/Button/Button";
import TextInput from "../../../../Components/SharedComponents/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

const Email = ({ onClick }) => {
  const [emailId, setEmailId] = useState("");
  return (
    <Card title={"Enter Your Email Id"} icon={"/images/email-emoji.png"}>
      <TextInput
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
        type="email"
        placeholder="Enter your Email Id"
      />
      <div className={styles.actionButtonWrap}>
        <Button onClick={onClick} text={"Next"} />
      </div>
      <p className={styles.bottomParagraph}>
        By entering your Email,you're agreening to our privacy policies and
        terms.
      </p>
    </Card>
  );
};
export default Email;
