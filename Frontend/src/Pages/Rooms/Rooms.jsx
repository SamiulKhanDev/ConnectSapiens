import React, { useState, useEffect } from "react";
import AddRoomModel from "../../Components/AddRoomModel/AddRoomModel";
import RoomsCard from "../../Components/RoomsCard/RoomsCard";
import { getAllRooms } from "../../Https/http-service";
import { getAllRoomsByName } from "../../Https/http-service";
import styles from "./Rooms.module.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [searchRoom, setSearchRoom] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchSameRooms = async (searchRoom) => {
      console.log(searchRoom);
      const { data } = searchRoom
        ? await getAllRoomsByName({ searchRoom })
        : await getAllRooms();
      // console.log(data);
      setRooms(data);
    };

    fetchSameRooms(searchRoom);
  }, [searchRoom]);

  const openShowModel = () => {
    setShowModel(true);
  };
  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <img src="/images/search-icon.png" alt="search" />
              <input
                type="text"
                value={searchRoom}
                onChange={(e) => setSearchRoom(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
          <div className={styles.right}>
            <button onClick={openShowModel} className={styles.startRoomButton}>
              <img src="/images/add-room-icon.png" alt="add-room" />
              <span>Start a room</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.roomList}>
        {rooms.map((room) => (
          <RoomsCard key={room._id} room={room} />
        ))}
      </div>
      {showModel && <AddRoomModel onClose={() => setShowModel(false)} />}
    </>
  );
};

export default Rooms;
