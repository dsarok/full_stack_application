import { useState } from "react";
export function Login({setLoggedIn}) {
  const [creds, setCreds] = useState({ username: "", password: "" });
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Login Form</h2>
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            height: "45%",
            width: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              marginBottom: "40px",
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <input
              placeholder={"username"}
              style={{
                borderWidth: "0px 0px 2px 0px",
                width: "80%",
                fontSize: 20
              }}
              onChange={(e) => {
                setCreds((c) => ({ ...c, username: e.target.value }));
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: 40
            }}
          >
            <input
              placeholder={"password"}
              style={{
                borderWidth: "0px 0px 2px 0px",
                width: "80%",
                fontSize: 20
              }}
              onChange={(e) => {
                setCreds((c) => ({ ...c, password: e.target.value }));
              }}
            />
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <button
              style={{ height: "30px", width: "80%" }}
              onClick={() => {
                fetch("http://localhost:3000/login",{
                    method:'POST',
                    body:JSON.stringify(creds),
                    headers:{
                        "Content-Type": "application/json",
                    }
                })
                  .then((res) => res.json())
                  .then(res=>setLoggedIn(res))
                  .catch((err) => console.log(err));
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
