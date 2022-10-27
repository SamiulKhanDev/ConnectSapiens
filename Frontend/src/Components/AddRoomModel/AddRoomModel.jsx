import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./AddRoomModel.module.css";
import TextInput from "../SharedComponents/TextInput/TextInput";
import { createRoom as create } from "../../Https/http-service";

const AddRoomModel = ({ onClose }) => {
  const history = useHistory();
  const [roomType, setRoomType] = useState("social");
  const [topic, setTopic] = useState("");
  const createRoom = async () => {
    if (!topic) return;
    try {
      console.log(topic, roomType);
      const { data } = await create({ topic, roomType });
      console.log(data, "data");
      history.push(`/room/${data._id}`);
    } catch (error) {}
  };
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <div onClick={onClose} className={styles.closeButton}>
          <img src="/images/close.png" alt="close-btn" />
        </div>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <TextInput
            fullwidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <h2 className={styles.subHeading}>Rooms Types</h2>
          <div className={styles.roomTypes}>
            <div
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
              onClick={() => setRoomType("open")}
            >
              <img src="/images/globe.png" alt="globe" />
              <span>Global</span>
            </div>
            <div
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
              onClick={() => setRoomType("social")}
            >
              <img src="/images/social.png" alt="social" />
              <span>Social</span>
            </div>
            <div
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
              onClick={() => setRoomType("private")}
            >
              <img src="/images/lock.png" alt="lock" />
              <span>Lock</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room,open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src="/images/celebration.png" alt="celebration" />
            <span>Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModel;
