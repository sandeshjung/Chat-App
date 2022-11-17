import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const UserListItem = ({ userInfo, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={userInfo.name}
        src={userInfo.pic}
      />
      <Box>
        <Text>{userInfo.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {userInfo.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
