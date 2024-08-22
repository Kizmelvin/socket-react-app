import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMsg, setCurrentMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (currentMsg !== "") {
      const messageBody = {
        id: socket.id,
        room: room,
        sender: username,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageBody);
      setMessages((list) => [...list, messageBody]);

      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
        <p>New message!</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messages &&
            messages.map((msg) => {
              return (
                <div
                  className="message"
                  id={username === msg.sender ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{msg.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{msg.time}</p>
                      <p id="sender">{msg.sender}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
