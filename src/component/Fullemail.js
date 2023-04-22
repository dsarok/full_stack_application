import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Fullemail({creds}) {
    const {id} = useParams()
    const [message, setMessage] = useState({})
    console.log(message,'this is the message going to be read')
    useEffect(() => {
      fetch(`http://localhost:3000/${id}/${creds.username}`)
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        setMessage(res)})
    }, [])
    
    return (
        <div>
          <h2>{message.subject}</h2>
          <h6>{message.date}</h6>
          <p>{message.body}</p>
        </div>
      );
}
