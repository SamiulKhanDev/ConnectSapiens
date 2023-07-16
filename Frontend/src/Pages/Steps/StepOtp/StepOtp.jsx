import React, { useState } from "react";
import styles from "./StepOtp.module.css";
import Button from "../../../Components/SharedComponents/Button/Button";
import Card from "../../../Components/SharedComponents/Card/Card";
import TextInput from "../../../Components/SharedComponents/TextInput/TextInput";
import { verifyOtp } from "../../../Https/http-service";
import { useStateValue } from "../../../GlobalState/context";
const StepOtp = ({ onClick }) => {
  const [otp, setOtp] = useState("");
  const [{ identifier, hash }, dispatch] = useStateValue();
  const submit = async () => {
    if (!identifier || !hash || !otp) return;
    const { data } = await verifyOtp({ identifier, hash, otp });
    dispatch({
      type: "SET_USER",
      user: data.user,
    });
    // onClick();
  };
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={"Enter Your OTP"} icon={"/images/lock-emoji.png"}>
          <TextInput
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            onWheel={(e) => e.target.blur()}
            type="number"
          />
          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text={"Next"} />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number,you're agreening to our privacy policies and
            terms.
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
