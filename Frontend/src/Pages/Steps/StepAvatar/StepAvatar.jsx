import React from "react";
import styles from "./StepAvatar.module.css";
import Button from "../../../Components/SharedComponents/Button/Button";
import Card from "../../../Components/SharedComponents/Card/Card";
import TextInput from "../../../Components/SharedComponents/TextInput/TextInput";
const StepAvatar = ({ onClick }) => {
  return (
    <div className={styles.cardWrapper}>
      <Card title={"What's your full Name?"} icon={"/images/goggle-emoji.png"}>
        <TextInput type="text" placeholder={"Name"}></TextInput>
        <div className={styles.actionButtonWrap}>
          <Button onClick={onClick} text={"Next"} />
        </div>
      </Card>
    </div>
  );
};

export default StepAvatar;
