import React, { useState } from "react";
import styles from "./StepAvatar.module.css";
import Button from "../../../Components/SharedComponents/Button/Button";
import Card from "../../../Components/SharedComponents/Card/Card";
import { activate } from "../../../Https/http-service";
import { useStateValue } from "../../../GlobalState/context";
const StepAvatar = ({ onClick }) => {
  const [{ name, avatar }, dispatch] = useStateValue();

  const [image, setImage] = useState(
    avatar ? avatar : "/images/monkey-avatar.png"
  );
  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0]; //this image is in file format, we have convert if in base64 format using FileReader api(provided by browser);

    const converToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onloadend = () => resolve(fr.result);
        fr.onerror = (error) => reject(error);
      });
    };
    converToBase64(file)
      .then((res) => {
        setImage(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submit = async () => {
    dispatch({
      type: "SET_AVATAR",
      avatar: image,
    });
    // console.log(avatar);
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        dispatch({
          type: "SET_USER",
          user: data.user,
        });
        dispatch({
          type: "SET_Auth",
          isAuth: data.auth,
        });
      }
    } catch (error) {
      console.log(error);
    }
    // onClick();
  };

  return (
    <div className={styles.cardWrapper}>
      <Card title={`Hi! ${name}`} icon={"/images/monkey-emoji.png"}>
        <p className={styles.subHeading}>How's this picture?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="avatar" />
        </div>
        <div>
          <input
            onChange={handleChange}
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
