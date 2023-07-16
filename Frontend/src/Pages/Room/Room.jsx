import React, { useState, useEffect } from "react";
import styles from "./Room.module.css";
import { useWebRtc } from "../../Hooks/useWebRtc";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useStateValue } from "../../GlobalState/context";
import { getRoom } from "../../Https/http-service";
const Room = () => {
  const [{ user }, dispatch] = useStateValue();
  const { id: roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [isMute, setIsMute] = useState(true);
  const { clients, provideRef, handleMute } = useWebRtc(roomId, user);
  const history = useHistory();

  useEffect(() => {
    const func = async () => {
      const { data } = await getRoom({ roomId });
      if (data) {
        setRoom((prev) => data);
      }
    };
    func();
  }, [roomId]);

  useEffect(() => {
    handleMute(isMute, user._id);
  }, [isMute]);

  const handleManualLeave = () => {
    history.push("/rooms");
  };
  const handleMuteClick = (clientId) => {
    if (clientId != user._id) return;
    setIsMute((prev) => !prev);
  };
  return (
    <div>
      <div className={styles.container}>
        <button onClick={handleManualLeave} className={styles.goBack}>
          <img src="/images/arrow-left.png" alt="arrow-left" />
          <span>All voice rooms</span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          {room && <h2 className={styles.topic}>{room.topic}</h2>}
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img src="/images/palm.png" alt="palm-icon" />
            </button>
            <button onClick={handleManualLeave} className={styles.actionBtn}>
              <img src="/images/win.png" alt="win-icon" />
              <span>Leave quietly</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients.map((client) => {
            // console.dir(client);
            return (
              <div className={styles.client} key={client._id}>
                <div className={styles.userHead}>
                  <img
                    className={styles.userAvatar}
                    src={client.avatar}
                    alt=""
                  />
                  <audio
                    autoPlay
                    ref={(instance) => {
                      provideRef(instance, client._id);
                    }}
                  />
                  <button
                    onClick={() => handleMuteClick(client._id)}
                    className={styles.micBtn}
                  >
                    {client.muted ? (
                      <img
                        className={styles.mic}
                        src="/images/mic-mute.png"
                        alt="mic"
                      />
                    ) : (
                      <img
                        className={styles.micImg}
                        src="/images/mic.png"
                        alt="mic"
                      />
                    )}
                  </button>
                </div>
                <h4>{client.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;
