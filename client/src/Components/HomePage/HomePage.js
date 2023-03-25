import React from 'react'
import { Box, Container, Text, Tabs, Tab, TabPanel, TabPanels, TabList } from "@chakra-ui/react"
import Login from '../Authentication/Login'
import Signup from '../Authentication/Signup'

const HomePage = () => {
    // const []

    return (
        <Container maxW='xl' centerContent display={'flex'} m='10px auto' bg={'lightblue'} p={'1rem'}>
            <Box
                d='flex'
                justifyContent='center'
                p={3}
                bg={'white'}
                w="100%"
                m='0px 0 15px 0'
                borderRadius='1rem'
                borderWidth='1px'
            >
                <Text fontSize='4xl' color='black' fontFamily={'heading'} textAlign='center'><strong>CHARCHA</strong></Text>
            </Box>
            <Box
                d='flex'
                justifyContent='center'
                p={3}
                bg={'white'}
                w="100%"
                borderRadius='1rem'
                borderWidth='1px'
            >
                <Tabs variant='unstyled'>
                    <TabList>
                        <Tab width="50%" fontSize='16px' fontWeight='500
                        ' borderRadius={'25px'} _selected={{ color: 'white', bg: 'blue.500' }}>Login</Tab>
                        <Tab width='50%' fontSize='16px' fontWeight='bold' borderRadius={'25px'} _selected={{ color: 'white', bg: 'blue.400', width: "50%" }}>Signup</Tab>
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
    )
}

export default HomePage