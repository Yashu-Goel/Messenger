import React from 'react';
import { ChatState } from '../../Context/ChatProvider';
import SideDrawer from '../Misc/SideDrawer';
import ChatBox from "../Misc/ChatBox";
import MyChats from "../Misc/MyChats";
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
      <Box
        display='flex'
        justifyContent='space-between'
        w='100%'
        h='91.5vh'
        p='10px'
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}

export default ChatPage;