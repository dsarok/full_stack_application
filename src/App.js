import logo from "./logo.svg";
import "./App.css";
import { Login } from "./component/Login";
import { useState } from "react";
import Loggedin from "./component/Loggedin";

function App() {
  const [loggedin, setLoggedIn] = useState(false);
  return loggedin ? <Loggedin />:<Login setLoggedIn={setLoggedIn} />;
}

export default App;
