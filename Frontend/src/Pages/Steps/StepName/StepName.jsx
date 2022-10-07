import React, { useState } from "react";
import styles from "./StepName.module.css";
import Button from "../../../Components/SharedComponents/Button/Button";
import Card from "../../../Components/SharedComponents/Card/Card";
import TextInput from "../../../Components/SharedComponents/TextInput/TextInput";
import { useStateValue } from "../../../GlobalState/context";
const StepName = ({ onClick }) => {
  const [obj, dispatch] = useStateValue();
  const [name, setName] = useState(obj.name);
  const onChange = (e) => {
    setName(e.target.value);
  };

  const submit = () => {
    if (!name) return;
    dispatch({
      type: "SET_USER_NAME",
      name,
    });
    onClick();
  };

  return (
    <div className={styles.cardWrapper}>
      <Card title={"What's your full Name?"} icon={"/images/goggle-emoji.png"}>
        <TextInput
          type="text"
          placeholder={"Name"}
          value={name}
          onChange={(e) => onChange(e)}
        ></TextInput>
        <p className={styles.bottomParagraph}>
          Please provide a name to go to next step
        </p>
        <div className={styles.actionButtonWrap}>
          <Button onClick={submit} text={"Next"} />
        </div>
      </Card>
    </div>
  );
};

export default StepName;
