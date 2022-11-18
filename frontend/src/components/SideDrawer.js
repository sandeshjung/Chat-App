import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import {
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useSelector, useDispatch } from "react-redux";
import ProfileModal from "./ProfileModal";
import { logout } from "../actions/userAction";

import { useDisclosure } from "@chakra-ui/hooks";
import Loader from "./Loader";

import UserListItem from "./UserListItem";
import { searchUser } from "../actions/userAction";
import { createChat } from "../actions/chatAction";
import { Spinner } from "@chakra-ui/spinner";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  //   const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const toast = useToast();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${userInfo.token}`,
      //     },
      //   };

      //   const { data } = await axios.get(`/api/users?search=${search}`, config);
      dispatch(searchUser(search));

      //   setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    setLoading(false);
  };

  const userSearch = useSelector((state) => state.userSearch);
  const { user } = userSearch;

  const accessChat = (userId) => {
    try {
      setLoadingChat(true);
      dispatch(createChat(userId));
      //   console.log(userId);

      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    // navigate("/");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        bg="#075e54"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text
              display={{ base: "none", md: "flex" }}
              px="4"
              textColor="white"
            >
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fonsize="2xl" fontFamily="Work sans" textColor="white">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={userInfo.name}
                src={userInfo.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal userInfo={userInfo}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <Loader />
            ) : (
              user?.map((userInfo) => (
                <UserListItem
                  key={userInfo._id}
                  userInfo={userInfo}
                  handleFunction={() => accessChat(userInfo._id)}
                ></UserListItem>
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
