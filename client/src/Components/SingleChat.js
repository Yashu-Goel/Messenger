import React, { createContext, useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast, Center } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from './config/getSender';
import ProfileModal from './Misc/ProfileModal';
import UpdateGroupChatModal from './Misc/UpdateGroupChatModal';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import './styles.css'

const API_BASE = 'http://localhost:5000'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();

    const toast = useToast();
    const { user, selectedChat, setSelectedChat } = ChatState();

    const fetchMessages = async (event) => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            setLoading(true);

            const { data } = await axios.get(API_BASE + `/message/${selectedChat._id}`, config);

            setMessages(data);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured",
                status: "Failed to send the message",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [selectedChat])

    const sentMessage = async (e) => {
        if (e.key === 'Enter' && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                }

                const { data } = await axios.post(API_BASE + `/message`, {
                    content: newMessage,
                    chatId: selectedChat._id
                }, config)

                setNewMessage("");
                setMessages([...messages, data])

            } catch (error) {
                toast({
                    title: "Error Occured",
                    status: "Failed to send the message",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
    }

    return (
        <>
            {
                selectedChat ? (
                    <>
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                            pb={3}
                            px={2}
                            w='100%'
                            fontFamily='Work sans'
                            display={"flex"}
                            justifyContent={{ base: 'space-between' }}
                            alignItems='center'
                        >
                            <IconButton
                                display={{ base: 'flex', md: 'none' }}
                                icon={<ArrowBackIcon />}
                                onClick={() => setSelectedChat("")}
                            />
                            {
                                !selectedChat.isGroupChat ? (
                                    <>
                                        {
                                            getSender(user, selectedChat.users)
                                        }
                                        <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                                    </>
                                ) : (
                                    <>
                                        {
                                            selectedChat.chatName.toUpperCase()
                                        }
                                        {
                                            <UpdateGroupChatModal
                                                fetchAgain={fetchAgain}
                                                setFetchAgain={setFetchAgain}
                                                fetchMessages={fetchMessages}
                                            />
                                        }
                                    </>
                                )
                            }
                        </Text>
                        <Box
                            display={'flex'}
                            flexDir={'column'}
                            justifyContent={'flex-end'}
                            p={3}
                            bg='#E8E8E8'
                            w='100%'
                            h='100%'
                            borderRadius='lg'
                            overflowY='hidden'>

                            {loading ? <Spinner
                                mb={'200'}
                                margin={'auto'}
                            /> : (<div className='messages'>
                                <ScrollableChat messages={messages} />
                            </div>)}
                            <FormControl
                                onKeyDown={sentMessage}
                                isRequired
                            >
                                <Input
                                    variant='filled'
                                    bg='#E0E0E0'
                                    placeholder='Type a message'
                                    onChange={typingHandler}
                                    value={newMessage}
                                />
                            </FormControl>
                        </Box>
                    </>
                ) : (
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        h={'100%'}
                    >
                        <Text
                            fontSize={'3xl'}
                            pb={3}
                            fontFamily='Work sans'
                        >
                            Click on a user to start chatting
                        </Text>
                    </Box>
                )
            }
        </>
    )
};

export default SingleChat