import React, { useContext } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import {
  Box,
  // Container,
  // Center,
  // Tabs,
  // Tab,
  // TabPanel,
  // TabPanels,
  // TabList,
  // Image,
} from "@chakra-ui/react";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>Chats
      {/* {user && <SideDrawer />} */}
      <Box>
        {/* {user && <MyChats />} */}
        {/* {user && <ChatBox />} */}
      </Box>
    </div>
  )
}

export default ChatPage;