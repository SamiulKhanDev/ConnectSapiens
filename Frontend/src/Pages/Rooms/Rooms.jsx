import React, { useState, useEffect } from "react";
import AddRoomModel from "../../Components/AddRoomModel/AddRoomModel";
import RoomsCard from "../../Components/RoomsCard/RoomsCard";
import { getAllRooms } from "../../Https/http-service";
import styles from "./Rooms.module.css";
// const rooms = [
//   {
//     id: 1,
//     topic: "Which framework best for frontend ?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 3,
//     topic: "What’s new in machine learning?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 4,
//     topic: "Why people use stack overflow?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 5,
//     topic: "Artificial inteligence is the future?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
// ];
const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      // console.log(data);
      setRooms(data);
    };
    fetchRooms();
  }, []);

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
              <input type="text" className={styles.searchInput} />
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
