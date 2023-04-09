import { React, useState } from "react";
import { Stack } from "@chakra-ui/react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/";
const Signup = () => {

  const [show, setShow] = useState(false);
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast.warning("Please select an Image!", {
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "messenger-app");
      data.append("cloud_name", "dmzxfmkfs")
      fetch("https://api.cloudinary.com/v1_1/dmzxfmkfs/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        })
    }
    else {
      toast.warning("Please select an Image!", {
        theme: "colored",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async (e) => {
    setLoading(true);
    const { name, email, password, cpassword, pic } = user;

    if (cpassword !== password) {
      toast.info("Passwords Do not Match", {
        theme: "colored",
      });
      setLoading(false);
      return;
    }
    if (!name || !email || !password || !cpassword) {
      toast.info("Please fill all the fields", {
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    await axios.post(API_BASE, {
      name,
      email,
      password,
      pic
    })
      .then((res) => {
        toast.success("Registration Success", {
          theme: "colored",
        });
        localStorage.setItem("profile", JSON.stringify(res.data));
        setLoading(false);
        
        navigate('/chats');
      })
      .catch((error) => {
        toast.error(`${error.response.data}`, {
          theme: "colored",
        });
        setLoading(false);
      });
  };

  return (
    <>
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
            isLoading={loading}
          >
            Signup
          </Button>
        </FormControl>
      </Stack>
    </>
  );
};

export default Signup;
