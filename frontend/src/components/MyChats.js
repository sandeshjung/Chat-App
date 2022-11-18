import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChats, selectChat } from "../actions/chatAction";
import { Box, Stack, Text } from "@chakra-ui/react";
import Loader from "./Loader";
import { getSender } from "../config/ChatLogics";
// import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  // const [selectedChat, setSelectedChat] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const fetchChats = useSelector((state) => state.fetchChats);
  const { chat } = fetchChats;

  const chatSelected = useSelector((state) => state.chatSelected);
  const { selectedChat } = chatSelected;

  // console.log(chat);
  const handleChat = (ch) => {
    dispatch(selectChat(ch));
  };

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch, fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="#075e54"
      w="31%"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        textColor="white"
      >
        My Chats
        {/* <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal> */}
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chat ? (
          <Stack overflowY="scroll">
            {chat.map((ch) => (
              <Box
                onClick={() => handleChat(ch)}
                cursor="pointer"
                bg={selectedChat === ch ? "#128c7e" : "#ece5dd"}
                color={selectedChat === ch ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={ch._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(userInfo, ch.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <Loader />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
