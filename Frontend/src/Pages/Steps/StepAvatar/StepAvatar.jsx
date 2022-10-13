import React, { useState } from "react";
import styles from "./StepAvatar.module.css";
import Button from "../../../Components/SharedComponents/Button/Button";
import Card from "../../../Components/SharedComponents/Card/Card";
import { activate } from "../../../Https/http-service";
import { useStateValue } from "../../../GlobalState/context";
import Loader from "../../../Components/SharedComponents/Loader/Loader";
const StepAvatar = ({ onClick }) => {
  const [{ name, avatar }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState("/images/monkey-avatar.png");
  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch({
        type: "SET_AVATAR",
        avatar: reader.result,
      });
    };
  }
  const submit = async () => {
    if (!avatar || !name) {
      return;
    }
    setLoading(true);
    // console.log(avatar);
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        dispatch({
          type: "SET_AUTH_USER",
          isAuth: data.auth,
          user: data.user,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    // onClick();
  };

  if (loading) {
    return <Loader message={"Loading,Please wait..."} />;
  }
  return (
    <div className={styles.cardWrapper}>
      <Card title={`Hi! ${name}`} icon={"/images/monkey-emoji.png"}>
        <p className={styles.subHeading}>How's this picture?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="avatar" />
        </div>
        <div>
          <input
            onChange={captureImage}
            type="file"
            id="avatarInput"
            className={styles.avatarInput}
          />
          <label htmlFor="avatarInput" className={styles.avatarLabel}>
            Choose a different Image
          </label>
        </div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={submit} text={"Double Click To Continue"} />
        </div>
      </Card>
    </div>
  );
};

export default StepAvatar;
