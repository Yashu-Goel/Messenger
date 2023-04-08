import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import SideDrawer from '../Misc/SideDrawer';
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
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box>
        {/* {user && <MyChats />} */}
        {/* {user && <ChatBox />} */}
      </Box>
    </div>
  )
}

export default ChatPage