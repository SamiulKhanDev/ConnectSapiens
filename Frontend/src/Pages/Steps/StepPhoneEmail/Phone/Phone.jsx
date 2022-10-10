import React, { useState } from "react";
import Card from "../../../../Components/SharedComponents/Card/Card";
import Button from "../../../../Components/SharedComponents/Button/Button";
import TextInput from "../../../../Components/SharedComponents/TextInput/TextInput";
import { sendOtp } from "../../../../Https/http-service";
import { useStateValue } from "../../../../GlobalState/context";
import styles from "../StepPhoneEmail.module.css";

const Phone = ({ onClick }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [{}, dispatch] = useStateValue();

  async function submit() {
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data);
    dispatch({
      type: "SET_OTP",
      hash: data.hash,
      phone: data.phone,
    });
    // console.log(hash, phone);
    onClick();
  }
  return (
    <Card title={"Enter Your Phone Number"} icon={"/images/Emoji.png"}>
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
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
