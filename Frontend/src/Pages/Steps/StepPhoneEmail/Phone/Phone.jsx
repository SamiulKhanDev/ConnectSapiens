import React, { useState } from "react";
import Card from "../../../../Components/SharedComponents/Card/Card";
import Button from "../../../../Components/SharedComponents/Button/Button";
import TextInput from "../../../../Components/SharedComponents/TextInput/TextInput";
import { sendOtp } from "../../../../Https/http-service";
import { useStateValue } from "../../../../GlobalState/context";
import styles from "../StepPhoneEmail.module.css";

const Phone = ({ onClick }) => {
  const [identifier, setIdentifier] = useState("");
  const [{}, dispatch] = useStateValue();

  async function submit() {
    if (!identifier) return;
    const { data } = await sendOtp({ identifier, type: "Phone" });
    console.log(data);
    dispatch({
      type: "SET_OTP",
      hash: data.hash,
      identifier: data.identifier,
    });
    // console.log(hash, phone);
    onClick();
  }
  return (
    <Card title={"Enter Your Phone Number"} icon={"/images/Emoji.png"}>
      <TextInput
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        onWheel={(e) => e.target.blur()}
        type="number"
        placeholder="Enter your phone number"
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={submit} text={"Next"} />
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
