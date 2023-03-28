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
} from '@chakra-ui/react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../App.css'
const API_BASE = "http://localhost:5000";
const Login = () => {
  const navigate= useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(()=>
  {
     const fetchData = async () => {
       var token = localStorage.getItem("profile");
       try {
         const res = await axios.post(API_BASE +"/validate", {
          token
         }).then((res)=>
         {
          navigate("/chats");
         }).catch((error)=>
         {
          console.log("Error: "+ error);
         })
       } catch (error) {
         console.log(error);
       }
     };
     fetchData();
  },[])


  const submitHandler = async(e) =>{
    e.preventDefault();
    if(!email || !password )
    {
      toast.info("Invalid Credentials", {
        theme: "colored",
      });
       return;
    }
    await axios
      .post(API_BASE + "/login", {
        email,
        password,
      })
      .then((res) => {
        toast.success("Login Successful",{
          theme: "colored"
        });
        localStorage.setItem("profile", res.data.token)
        setTimeout(() => {
          navigate("/chats");
        }, 3000);
      })
      .catch((error) => {
        toast.error("Invalid Credentials!", {
          theme: "colored",
        });
      });
  }

  return (
    <>
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName="my-toast"
      />
    </>
  );
}

export default Login