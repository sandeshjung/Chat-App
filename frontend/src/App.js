import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import HomeScreen from "./Screen/HomeScreen";
import LoginScreen from "./Screen/LoginScreen";

function App() {
  return (
    <Router>
      <Container maxWidth="sm"></Container>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
      </Routes>
    </Router>
  );
}

export default App;
