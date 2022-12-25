import { useCallback, useRef, useState, useEffect } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import socketInit from "../Socket/index";
import { ACTIONS } from "../actions";
import freeIce from "freeice";
export const useWebRtc = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({}); //to map user to its audio player,to control their audio player output,
  //such as mute them, unmute them etc.
  const connections = useRef({}); //to store all connected users;
  const localMediaStream = useRef(null);
  const socket = useRef(null);
  const clientsRef = useRef([]);
  //-------------------------------------------
  useEffect(() => {
    socket.current = socketInit();
  }, []);
  //-------------------------------------------

  //-------------------------------------------
  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };
  //-------------------------------------------

  //-------------------------------------------
  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client._id === newClient._id);
      if (lookingFor === undefined) {
        setClients((prev) => [...prev, newClient], cb);
      }
    },
    [clients, setClients]
  );
  //-------------------------------------------

  //capture media

  //-------------------------------------------
  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      addNewClient({ ...user, muted: true }, () => {
        const localElement = audioElements.current[user._id];
        // console.log(user);
        // console.log(localElement);
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }

        //JOIN event in socket io

        socket.current.emit(ACTIONS.JOIN, { roomId, user });
      });
    });

    return () => {
      //leaving the rooms;
      localMediaStream.current.getTracks().forEach((track) => track.stop());
      socket.current.emit(ACTIONS.LEAVE, { roomId });
    };
  }, []);
  //-------------------------------------------

  //-------------------------------------------
  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      if (peerId in connections.current) {
        return alert("already connected");
      }

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeIce(), //STUN and TURN servers to maintain the webRTC;
      });
      //hanlde new iceCandidate
      connections.current[peerId].onicecandidate = (event) => {
        socket.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };
      //handle on track on this connection
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient({ ...remoteUser, muted: true }, () => {
          if (audioElements.current[remoteUser._id]) {
            audioElements.current[remoteUser._id].srcObject = remoteStream;
          } else {
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser._id]) {
                audioElements.current[remoteUser._id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) {
                clearInterval(interval);
              }
            }, 300);
          }
        });
      };
      //add local track to remote connections
      localMediaStream.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStream.current);
      });
      //create offer
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();
        await connections.current[peerId].setLocalDescription(offer);
        //seding the offer to another client
        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };
    socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
    return () => {
      socket.current.off(ACTIONS.ADD_PEER);
    };
  }, []);
  //-------------------------------------------

  //-------------------------------------------
  //handle icecandidate
  useEffect(() => {
    socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });

    return () => {
      socket.current.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);
  //-------------------------------------------

  //-------------------------------------------
  //handle sdp
  useEffect(() => {
    socket.current.on(
      ACTIONS.SESSION_DESCRIPTION,
      async ({ peerId, sessionDescription: remoteSessionDescription }) => {
        connections.current[peerId].setRemoteDescription(
          new RTCSessionDescription(remoteSessionDescription)
        );

        //if sessionDescription is offer create an answer
        if (remoteSessionDescription.type === "offer") {
          const connection = connections.current[peerId];
          const answer = await connection.createAnswer();
          connection.setLocalDescription(answer);
          socket.current.emit(ACTIONS.RELAY_SDP, {
            peerId,
            sessionDescription: answer,
          });
        }
      }
    );
    return () => {
      socket.current.off(ACTIONS.SESSION_DESCRIPTION);
    };
  }, []);
  //-------------------------------------------

  //-------------------------------------------
  //handle remove peer
  useEffect(() => {
    socket.current.on(ACTIONS.REMOVE_PEER, async ({ peerId, userId }) => {
      if (connections.current[peerId]) {
        connections.current[peerId].close();
      }
      delete connections.current[peerId];
      delete audioElements.current[peerId];
      setClients((list) => {
        return list.filter((client) => client._id != userId);
      });
    });

    return () => {
      for (let peerId in connections.current) {
        connections.current[peerId].close();
        delete connections.current[peerId];
        delete audioElements.current[peerId];
        // console.log('removing', connections.current);
      }
      socket.current.off(ACTIONS.REMOVE_PEER);
    };
    //-------------------------------------------
  }, []);
  //------------------------------------------
  //storing clients to ref
  useEffect(() => {
    clientsRef.current = clients;
  }, [clients]);

  //-------------------------------------------
  //listen from mute unmute

  useEffect(() => {
    socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
      setMute(true, userId);
    });
    socket.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
      setMute(false, userId);
    });

    const setMute = (isMute, userId) => {
      const clientIdx = clientsRef.current
        .map((client) => client._id)
        .indexOf(userId);
      const copiedClientsFromRef = JSON.parse(
        JSON.stringify(clientsRef.current)
      );
      if (clientIdx != -1) {
        copiedClientsFromRef[clientIdx].muted = isMute;
        setClients(copiedClientsFromRef);
      }
    };
  }, []);

  //-------------------------------------------
  //handle Mute
  const handleMute = (isMute, userId) => {
    console.log(isMute + " isMute");
    let settled = false;
    let interval = setInterval(() => {
      if (localMediaStream.current) {
        localMediaStream.current.getTracks()[0].enabled = !isMute;
        if (isMute) {
          socket.current.emit(ACTIONS.MUTE, {
            roomId,
            userId,
          });
        } else {
          socket.current.emit(ACTIONS.UNMUTE, {
            roomId,
            userId,
          });
        }

        settled = true;
      }
      if (settled) {
        clearInterval(interval);
      }
    }, 200);
  };
  //-------------------------------------------

  return { clients, provideRef, handleMute };
};

//IceServers(STUN ,TURN) helps to find out public IP of the machine so that it can be shared with other devices
