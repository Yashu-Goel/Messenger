import { React, useState } from 'react'
import { Stack } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
const API_BASE = "http://localhost:5000/";
const Signup = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    const [user, setUser]= useState({
        name: "",
        email:"",
        password: "",
        cpassword: "",
        pic: ""
    })
    const postDetails = (pics) => { };

    async function submitHandler(e) {
        e.preventDefault();
        //implement the backend here -> OK
        const { name, email, password, cpassword } = user;

        const response = await fetch(API_BASE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            cpassword,
          }),
        });

        const data = await response.json();
        if (response.status === 422 || !data) {
          window.alert("Invalid Credential");
        } else {
          window.alert(" Registration Successful");
          navigate("/");
        }
    };
    let name, value;
    const handleInputs = (e) =>
    {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }
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
}

export default Signup