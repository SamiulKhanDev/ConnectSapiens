import React, { useState } from "react";
import Card from "../../../../Components/SharedComponents/Card/Card";
import Button from "../../../../Components/SharedComponents/Button/Button";
import TextInput from "../../../../Components/SharedComponents/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { useStateValue } from "../../../../GlobalState/context";
import { sendOtp } from "../../../../Https/http-service";

const Email = ({ onClick }) => {
  const [identifier, setIdentifier] = useState("");
  const [{}, dispatch] = useStateValue();

  async function submit() {
    if (!identifier) return;
    const { data } = await sendOtp({ identifier, type: "Email" });
    // console.log(data);
    dispatch({
      type: "SET_OTP",
      hash: data.hash,
      identifier: data.identifier,
    });
    // console.log(hash, phone);
    onClick();
  }
  return (
    <Card title={"Enter Your Email Id"} icon={"/images/email-emoji.png"}>
      <TextInput
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        type="email"
        placeholder="Enter your Email Id"
      />
      <div className={styles.actionButtonWrap}>
        <Button onClick={submit} text={"Next"} />
      </div>
      <p className={styles.bottomParagraph}>
        By entering your Email,you're agreening to our privacy policies and
        terms.
      </p>
    </Card>
  );
};
export default Email;
