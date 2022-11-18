import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { SELECT_CHAT_RESET } from "../constants/chatConstants";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./ProfileModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const chatSelected = useSelector((state) => state.chatSelected);
  const { selectedChat } = chatSelected;

  const dispatch = useDispatch();
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => dispatch({ type: SELECT_CHAT_RESET })}
            />
            {selectedChat && (
              <>
                {getSender(userInfo, selectedChat.users)}
                <ProfileModal
                  userInfo={getSenderFull(userInfo, selectedChat.users)}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            Messages here
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
