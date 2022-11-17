import React, { useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import { useNavigate } from "react-router-dom";

const ChatScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <>
      {userInfo && (
        <div style={{ width: "100%" }}>
          <SideDrawer />
          <div
            style={{
              width: "100%",
              height: "91.5vh",
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <MyChats />
            <ChatBox />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatScreen;
