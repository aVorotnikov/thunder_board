import React, { useState, useEffect } from "react";

import logo from './logo.png';
import './App.css';

function App() {
  const [data, setdata] = useState({
    boards: "",
    status: 500,
  });

  useEffect(() => {
    // Using fetch to fetch the api from flask server it will be redirected to proxy
    fetch("/boards").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setdata({
                boards: data.boards_list[0],
                status: res.status,
            });
        })
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://github.com/aVorotnikov/thunder_board"
          target="_blank"
          rel="noopener noreferrer"
        >
          ThunderBoard development is underway
        </a>
        <p>Boards list: {data.boards}</p>
        <p>Response status code: {data.status}</p>
      </header>
    </div>
  );
}

export default App;
