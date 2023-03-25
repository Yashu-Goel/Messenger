import { React, useState } from 'react'
import { Link, Stack } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text
} from '@chakra-ui/react'

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  async function submitHandler(e) {
    e.preventDefault();
    //implement the backend here
  }

  return (
    <Stack spacing='24px'>
      <FormControl isRequired>
        <FormLabel fontSize='1.5rem'>Email</FormLabel>
        <Input
          id='field-:r1'
          required
          aria-required='true'
          size='lg'
          type='email'
          fontSize='1.5rem'
          placeholder='Enter email address'
          padding={'0 0 0 5px'}
          onChange={(e) => setEmail(e.target.value)}
          m='0 0 1.8rem 0'
        />

        <FormLabel fontSize='1.5rem'>Password</FormLabel>
        <InputGroup size='lg'>
          <Input
            id='field-:r2'
            required
            aria-required='true'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            fontSize='1.5rem'
            onChange={(e) => setPass(e.target.value)}
            padding={'0 0 0 5px'}
          />
          <InputRightElement marginRight={'0.5rem'}>
            <Button h='1.75rem' onClick={() => setShow(!show)} >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Link m='1rem 0 1.8rem 0' fontSize={'1.1rem'} float={'right'}>forgot password?</Link>

        <Button
          colorScheme={'blue'}
          width='100%'
          height={'3rem'}
          fontWeight={'bold'}
          fontSize={'15px'}
          onClick={submitHandler}>
          Login
        </Button>

      </FormControl>
    </Stack>
  )
}

export default Login