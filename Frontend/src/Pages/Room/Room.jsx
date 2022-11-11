import React from "react";
import styles from "./Room.module.css";
import { useWebRtc } from "../../Hooks/useWebRtc";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useStateValue } from "../../GlobalState/context";
const Room = () => {
  const [{ user }, dispatch] = useStateValue();
  const { id: roomId } = useParams();
  console.log(roomId);
  const { clients, provideRef } = useWebRtc(roomId, user);
  return (
    <div>
      <h1>All connected clients</h1>
      {clients.map((client) => {
        return (
          <div>
            <audio
              ref={(instance) => provideRef(instance, client._id)}
              controls
              autoPlay
            ></audio>
            <h4>{client.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Room;
