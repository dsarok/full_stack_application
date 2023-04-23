import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Fullemail({ creds }) {
  const { id } = useParams();
  const [message, setMessage] = useState({});
  console.log(message, "this is the message going to be read");
  let jwt = localStorage.getItem("jwt");
  useEffect(() => {
    fetch(
      `http://localhost:3000/${id}/${creds.username}/` +
        new URLSearchParams({
          jwt: jwt,
        })
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if(res)
          setMessage(res);
        else
          setMessage({subject:"",date:'',body:''})
      });
  }, []);

  return (
    <div>
      <h2>{message.subject}</h2>
      <h6>{message.date}</h6>
      <p>{message.body}</p>
    </div>
  );
}
