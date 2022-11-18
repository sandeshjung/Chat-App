import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import { useNavigate } from "react-router-dom";

const ChatScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [fetchAgain, setFetchAgain] = useState(false);
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
            <MyChats fetchAgain={fetchAgain} />
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatScreen;
