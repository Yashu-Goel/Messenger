import React from 'react'
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
import LogoText from '../../Assets/LogoText.png'
import Logo from '../../Assets/Logo.png'
import LogoTextWithoutC from "../../Assets/LogoTextWithoutC.png";

const HomePage = () => {
    // const []

    return (
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
              width="45px"
              height="45px"
              alt="LogoText"
            />
            <Image
              src={LogoTextWithoutC}
              boxSize="50px"
              width="180px"
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
                fontSize="16px"
                fontWeight="500
                        "
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
    );
}

export default HomePage