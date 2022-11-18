import React from "react";
import LoginScreen from "./LoginScreen";
import "./HomeScreen.css";
import { Container } from "@chakra-ui/react";
// import "../bootstrap.min.css";
const HomeScreen = () => {
  return (
    <>
      <Container className="loginScreen">
        <LoginScreen />
      </Container>
    </>
  );
};

export default HomeScreen;
