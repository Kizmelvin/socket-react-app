import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChatBox, setShowChatBox] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      const userDetails = {
        username: username,
        room: room,
      };
      socket.emit("join_room", userDetails);
      socket.on("user_joined", (data) => {
        alert(`${data.username} joined the room`);
      });
      setShowChatBox(true);
    }
  };
  return (
    <div className="App">
      {!showChatBox ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
