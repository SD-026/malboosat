// src/ChatScreen.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:9999");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [name, setname ] = useState("");
  const lool= localStorage.getItem('name')

  const { state } = useLocation()
  // useLocation
  // console.log(state)
  // const name = 
  const newname=state.name



  useEffect(() => {
    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for user connection notifications
    socket.on("user-connected", (message) => {
      setMessages((prevMessages) => [...prevMessages, { content: message, system: true }]);
    });

    // Listen for user disconnection notifications
    socket.on("user-disconnected", (message) => {
      setMessages((prevMessages) => [...prevMessages, { content: message, system: true }]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("user-connected");
      socket.off("user-disconnected");
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { sender: newname?newname:'you', content: newMessage };
      socket.emit("sendMessage", message);
      setNewMessage("");
    }
  };

  const handleDisconnect = () => {
    socket.disconnect(); // Disconnects the socket connection
  };

  // const handelname=()=>{
  //   localStorage.setItem('name',name?name:'you')

  // }

  // console.log(lool)
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      


      {/* <button onClick={handleDisconnect} className="p-2 bg-red-500 text-white rounded">Disconnect</button> */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender ===newname ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.system ? "bg-yellow-300 text-black" : message.sender === newname ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                }`}
              >
                <p className=" text-xs font-medium -ml-2 text-red-600 ">{newname}</p>
                <p className="ml-2">{message.content}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-300">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
