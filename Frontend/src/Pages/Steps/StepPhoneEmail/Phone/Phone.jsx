import React, { useState } from "react";
import Card from "../../../../Components/SharedComponents/Card/Card";
import Button from "../../../../Components/SharedComponents/Button/Button";
import TextInput from "../../../../Components/SharedComponents/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

const Phone = ({ onClick }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <Card title={"Enter Your Phone Number"} icon={"/images/Emoji.png"}>
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        type="number"
        placeholder="Enter your phone number"
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={onClick} text={"Next"} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number,you're agreening to our privacy policies and
          terms.
        </p>
      </div>
    </Card>
  );
};

export default Phone;
