import { React, useState } from "react";
import { Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

// import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/";
const Signup = () => {

  const toast = useToast();
  const [show, setShow] = useState(true);

  // const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    pic: "",
  });
  const postDetails = (pics) => { };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = user;

    if (cpassword !== password) {
      toast({
        title: 'Wrong Details',
        description: "Password not matching",
        status: 'info',
        duration: 2500,
        isClosable: true,
      })
      return;
    }
    if (!name || !email || !password || !cpassword) {
      toast({
        title: 'Incomplete details',
        description: "Pls fill all the fields",
        status: 'info',
        duration: 2500,
        isClosable: true,
      })
      return;
    }

    await axios.post(API_BASE, {
      name,
      email,
      password
    })
      .then((res) => {
        toast({
          title: `${res.data}`,
          description: `Redirecting to login page. . .`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        setTimeout(() => {
          window.location.reload();
        }, 3000)
      })
      .catch((error) => {
        toast({
          title: 'Invalid Credentials',
          description: `${error.response.data}`,
          status: 'error',
          duration: 2500,
          isClosable: true,
        })
      });
  };
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <Stack spacing="24px">
      <FormControl isRequired>
        <FormLabel fontSize="1.5rem">Name</FormLabel>
        <Input
          id="field-:r1"
          required
          aria-required="true"
          size="lg"
          type="text"
          fontSize="1.5rem"
          placeholder="Your Name"
          padding={"0 0 0 5px"}
          name="name"
          value={user.name}
          onChange={handleInputs}
          m="0 0 1.8rem 0"
        />
        <FormLabel fontSize="1.5rem">Email</FormLabel>
        <Input
          id="field-:r1"
          required
          aria-required="true"
          size="lg"
          type="email"
          fontSize="1.5rem"
          placeholder="Your Email ID"
          padding={"0 0 0 5px"}
          name="email"
          value={user.email}
          onChange={handleInputs}
          m="0 0 1.8rem 0"
        />

        <FormLabel fontSize="1.5rem">Password</FormLabel>
        <InputGroup size="lg">
          <Input
            id="field-:r2"
            required
            aria-required="true"
            type={"Password"}
            placeholder="Enter password"
            fontSize="1.5rem"
            name="password"
            value={user.password}
            onChange={handleInputs}
            m="0 0 1.8rem 0"
            padding={"0 0 0 5px"}
          />
        </InputGroup>

        <FormLabel fontSize="1.5rem">Confirm Password</FormLabel>
        <InputGroup size="lg">
          <Input
            id="field-:r2"
            required
            aria-required="true"
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            fontSize="1.5rem"
            name="cpassword"
            value={user.cpassword}
            onChange={handleInputs}
            m="0 0 1.8rem 0"
            padding={"0 0 0 5px"}
          />
          <InputRightElement marginRight={"0.5rem"}>
            <Button h="1.75rem" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormLabel fontSize="1.5rem">Upload your picture</FormLabel>
        <InputGroup size="lg">
          <Input
            id="field-:r2"
            type={"file"}
            fontSize="1.5rem"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
            m="0 0 1.8rem 0"
            padding={"0 0 0 5px"}
          />
        </InputGroup>

        <Button
          colorScheme={"blue"}
          width="100%"
          height={"3rem"}
          fontWeight={"bold"}
          fontSize={"15px"}
          onClick={submitHandler}
        >
          Signup
        </Button>
      </FormControl>
    </Stack>
  );
};

export default Signup;
