import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatScreen from "./Screen/ChatScreen";
import HomeScreen from "./Screen/HomeScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/chat" element={<ChatScreen />} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
