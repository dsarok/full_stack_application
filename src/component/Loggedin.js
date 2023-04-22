import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "../componentStyle/Loggedin.css";
import Fullemail from "./Fullemail";

export default function Loggedin({creds}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/getemails")
      .then((res) => res.json())
      .then((res) => {
        setMessages(res);
        console.log(res);
      });

  }, []);

  function Bar({ data }) {
    return (
      <Link to={`/${data.id}`}>
        <button className="bar">
          <div className="elements">
            <div> {data.subject}</div>
            <div>{data.date}</div>
          </div>
        </button>
      </Link>
    );
  }

  function Consize() {
    return (
      <div>
        <h1 className="bar" style={{ backgroundColor: "white" }}>
          Emails
        </h1>
        {messages.map((e, id) => (
          <Bar data={e} key={id.toString()} />
        ))}
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Consize />} />
      <Route path="/:id" element={<Fullemail creds={creds}/>} />
    </Routes>
  );
}
