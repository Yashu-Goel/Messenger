import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Center,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Image,
} from "@chakra-ui/react";
import Login from '../Authentication/Login'
import Signup from '../Authentication/Signup'
import Logo from '../../Assets/Logo.png'

import { ToastContainer } from "react-toastify";
import '../../App.css'

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = (JSON.parse(localStorage.getItem("profile")));
    if (userInfo) {
      navigate("/chats");
    }
  }, [navigate])

  return (
    <>
      <Container
        maxW="xl"
        centerContent
        display={"flex"}
        m="10px auto"
        bg={"lightblue"}
        p={"1rem"}
      >
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg={"white"}
          w="100%"
          m="0px 0 15px 0"
          borderRadius="1rem"
          borderWidth="1px"
          
        >
          <Center>
            <Image
              src={Logo}
              boxSize="50px"
              width="14rem"
              alt="LogoText"
            />     
          </Center>
        </Box>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg={"white"}
          w="100%"
          borderRadius="1rem"
          borderWidth="1px"
        >
          <Tabs variant="unstyled">
            <TabList>
              <Tab
                width="50%"
                fontWeight="500"
                borderRadius={"25px"}
                _selected={{ color: "white", bg: "blue.500" }}
                
              >
                Login
              </Tab>
              <Tab
                width="50%"
                fontSize="16px"
                fontWeight="bold"
                borderRadius={"25px"}
                _selected={{ color: "white", bg: "blue.400", width: "50%" }}
              >
                Signup
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName="my-toast"
      />
    </>
  );
}

export default HomePage