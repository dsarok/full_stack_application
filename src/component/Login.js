import React, { useState } from "react";
import "../componentStyle/Login.css";
import Register from "./Register";
export default function Login({ setLoggedIn, creds, setCreds }) {
  const [register, setRegister] = useState(false);
  return !register ? (
    <div className="container">
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
          })
          .then(res=>res.json())
          .then((res) => {
            let jwt = res.jwt;
            if (jwt) {
              setLoggedIn(true);
              console.log(res, res);
              localStorage.setItem("jwt", jwt);
            } else {
              alert("wrong username or password");
            }
          });
        }}
      >
        <label>username</label>
        <input
          placeholder="user@email.com"
          onChange={(e) => {
            setCreds((p) => ({ ...p, username: e.target.value }));
          }}
        />
        <label>password</label>
        <input
          placeholder="password"
          type={"password"}
          onChange={(e) => {
            setCreds((p) => ({ ...p, password: e.target.value }));
          }}
        />
        <button type="submit">Log In</button>
      </form>
      <button className="link-bottom" onClick={(e) => setRegister(true)}>
        don't have an account? Register Now
      </button>
    </div>
  ) : (
    <Register setRegister={setRegister} />
  );
}
