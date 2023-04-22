import React, { useState } from "react";
import "../componentStyle/Login.css";

export default function Register({ setRegister }) {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div className="container">
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            creds.confirmPassword === creds.password &&
            creds.username.length > 0 &&
            creds.password.length > 4
          ) {
            fetch("http://localhost:3000/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(creds),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res === true) {
                  alert("now registered")
                  setCreds(()=>
                    { 
                      return {username: "", password: "", confirmPassword: "" }}
                  );
                } else {
                  alert("Error occurred");
                }
              })
              .catch((e) => alert("Something went wrong"));
          } else {
            alert("fill the form properly");
          }
        }}
      >
        <label>username</label>
        <input
          placeholder="user@email.com"
          value={creds.username}
          onChange={(e) => {
            setCreds((p) => ({ ...p, username: e.target.value }));
          }}
        />
        <label>set password</label>
        <input
          placeholder="password"
          value={creds.password}
          onChange={(e) => {
            setCreds((p) => ({ ...p, password: e.target.value }));
          }}
        />
        <label>confirm password</label>
        <input
          placeholder="confirm password"
          type={"password"}
          value={creds.confirmPassword}
          onChange={(e) => {
            setCreds((p) => ({ ...p, confirmPassword: e.target.value }));
          }}
        />
        <button type="submit">Register</button>
      </form>
      <button
        className="link-bottom"
        onClick={(e) => {
          setRegister(false);
        }}
      >
        Already have an account? Log in
      </button>
    </div>
  );
}
