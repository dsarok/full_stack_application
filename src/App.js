import "./App.css";
import Login from "./component/Login";
import { useEffect, useState } from "react";
import Loggedin from "./component/Loggedin";
function App() {
  const [loggedin, setLoggedIn] = useState(false);
  const [creds, setCreds] = useState({ username: "", password: "" });

  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (jwt === null) return;
    fetch(`http://localhost:3000/authorise/`+
    new URLSearchParams({
      jwt: jwt
    }))
      .then((res) => res.json())
      .then((res) => {
        if (res !== false) {
          console.log(res);
          setCreds((prev) => ({ ...creds, username: res.username }));
          setLoggedIn(true);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return loggedin ? (
    <Loggedin creds={creds} setLoggedIn={setLoggedIn}/>
  ) : (
    <Login setLoggedIn={setLoggedIn} setCreds={setCreds} creds={creds} />
  );
}

export default App;
