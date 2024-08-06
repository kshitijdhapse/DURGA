import React from "react";
import "./App.css"; // Import general styles
import logo from "./logo.png";

function App() {
  return (
    <div>
      <header className="AppBar">
        <a href="https://hoteldurgapune.com/">
          <img height={200} src={logo} className="AppBar-logo" alt="logo" />
        </a>
      </header>
      <div className="App"></div>
      <br></br>
      <div style={{ backgroundColor: "gold" }} className="App-content">
        Menu
      </div>
    </div>
  );
}

export default App;
