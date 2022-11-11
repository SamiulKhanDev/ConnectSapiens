import { useCallback, useRef, useState, useEffect } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import socketInit from "../Socket/index";
import { ACTIONS } from "../actions";
const users = [
  //   {
  //     id: 1,
  //     name: "samiul khan",
  //   },
  //   {
  //     id: 2,
  //     name: "john doe",
  //   },
];
export const useWebRtc = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({}); //to map user to its audio player,to control their audio player output,
  //such as mute them, unmute them etc.
  const connections = useRef({}); //to store all connected users;
  const localMediaStream = useRef(null);
  const socket = useRef(null);
  useEffect(() => {
    socket.current = socketInit();
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client._id === newClient._id);
      if (lookingFor === undefined) {
        setClients((prev) => [...prev, newClient], cb);
      }
    },
    [clients, setClients]
  );

  //capture media

  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      addNewClient(user, () => {
        const localElement = audioElements.current[user._id];
        // console.log(user);
        // console.log(localElement);
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }

        //JOIN event in socket io

        socket.current.emit(ACTIONS.JOIN, {});
      });
    });
  }, []);

  return { clients, provideRef };
};
