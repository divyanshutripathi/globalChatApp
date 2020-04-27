import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

const Chat = (props) => {
  const [messages, setMessages] = useState([
    { email: "test", message: "Hello And Welcome", date: Date.now() },
  ]);
  const [message, setMessage] = useState("");
  const [email, setName] = useState();

  //   setName(props.email);
  useEffect(() => {
    getMessages();
  }, [messages.length]);

  const getMessages = () => {
    socket.on("msg", (msg) => {
      setMessages([...msg.chats]);
    });
  };

  // On Change
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const onNameChange = (n) => {
    setName(n.target.value);
  };

  // On Click
  const onClick = () => {
    if (email) {
      if (message !== "") {
        socket.emit("msg", { email, message });
        setMessage("");
      } else {
        alert("Please Add A Message");
      }
    } else {
      alert("mention the email");
    }
  };

  return (
    <div>
      <label> Name :</label>
      <br></br>
      <input value={email} name="email" onChange={(n) => onNameChange(n)} />
      <br></br>
      <label> Message :</label>
      <br></br>
      <input value={message} name="message" onChange={(e) => onChange(e)} />
      <button onClick={() => onClick()}>Send Message</button>
      {messages.length > 0 &&
        messages.map((msg) => (
          <div>
            <p>
              sender: {msg.email} message: {msg.message} date: {msg.date}
            </p>
          </div>
        ))}
    </div>
  );
};
export default Chat;
