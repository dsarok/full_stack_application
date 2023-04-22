import "./App.css";
import Login from "./component/Login";
import { useState } from "react";
import Loggedin from "./component/Loggedin";
function App() {
  const [loggedin, setLoggedIn] = useState(false);
  const [creds, setCreds] = useState({ username: "", password: "" });
  return loggedin ? (
    <Loggedin creds={creds}/>
  ) : (
    <Login setLoggedIn={setLoggedIn} setCreds={setCreds} creds={creds} />
  );
}

export default App;
