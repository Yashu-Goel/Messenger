import { React, useState, useEffect } from 'react'
import { Link, Stack } from '@chakra-ui/react'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast
} from '@chakra-ui/react'
import '../../App.css'
const API_BASE = "http://localhost:5000";
const Login = () => {
  const toast = useToast();
  const navigate= useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(()=>
  {
     const fetchData = async () => {
       var token = localStorage.getItem("profile");
       try {
         const res = await axios.post(API_BASE +"/demo", {
          token,
         }).then((res)=>
         {
          navigate("/chats");
          console.log('res: '+ res.data);
         }).catch((error)=>
         {
          console.log("Error: "+ error);
         })
         
         // handle successful response
       } catch (error) {
         // handle error
         console.log(error);
       }
     };
     fetchData();
  },[])
  const submitHandler = async(e) =>{
    e.preventDefault();
    if(!email || !password )
    {
       toast({
         title: "Incomplete Details",
         description: "Please fill all the fields",
         status: "info",
         duration: 2500,
         isClosable: true,
         fontSize: "1.5rem",
       });
       return;
    }
    await axios
      .post(API_BASE + "/login", {
        email,
        password,
      })
      .then((res) => {
        
        toast({
          title: `${res.data.message}`,
          description: `Login Successful`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
        console.log("Token: " + res.data.token);
        localStorage.setItem("profile", res.data.token)
        console.log(res.data);
        navigate("/chats");
      })
      .catch((error) => {
        toast({
          title: "Invalid Credentials",
          description: `${error.response.data.error}`,
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top",
          className: "custom-toast",
        });
      });
  }

  return (
    <Stack spacing="24px">
      <FormControl isRequired>
        <FormLabel fontSize="1.5rem">Email</FormLabel>
        <Input
          id="field-:r1"
          required
          aria-required="true"
          size="lg"
          type="email"
          fontSize="1.5rem"
          placeholder="Enter email address"
          padding={"0 0 0 5px"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          m="0 0 1.8rem 0"
        />

        <FormLabel fontSize="1.5rem">Password</FormLabel>
        <InputGroup size="lg">
          <Input
            id="field-:r2"
            required
            aria-required="true"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            fontSize="1.5rem"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            padding={"0 0 0 5px"}
          />
          <InputRightElement marginRight={"0.5rem"}>
            <Button h="1.75rem" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Link m="1rem 0 1.8rem 0" fontSize={"1.1rem"} float={"right"}>
          forgot password?
        </Link>

        <Button
          colorScheme={"blue"}
          width="100%"
          height={"3rem"}
          fontWeight={"bold"}
          fontSize={"15px"}
          onClick={submitHandler}
        >
          Login
        </Button>
      </FormControl>
    </Stack>
  );
}

export default Login