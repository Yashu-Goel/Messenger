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

const Signup = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const [name, setName] = useState('');
    const [pic, setPic] = useState('');


    const postDetails = (pics) => { };

    async function submitHandler(e) {
        e.preventDefault();
        //implement the backend here
    }

    return (
        <Stack spacing='24px'>
            <FormControl isRequired>
                <FormLabel fontSize='1.5rem'>Name</FormLabel>
                <Input
                    id='field-:r1'
                    required
                    aria-required='true'
                    size='lg'
                    type='text'
                    fontSize='1.5rem'
                    placeholder='Enter name'
                    padding={'0 0 0 5px'}
                    onChange={(e) => setName(e.target.value)}
                    m='0 0 1.8rem 0'
                />
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
                        type={'password'}
                        placeholder='Enter password'
                        fontSize='1.5rem'
                        onChange={(e) => setPass(e.target.value)}
                        m='0 0 1.8rem 0'
                        padding={'0 0 0 5px'}
                    />
                </InputGroup>

                <FormLabel fontSize='1.5rem'>Confirm Password</FormLabel>
                <InputGroup size='lg'>
                    <Input
                        id='field-:r2'
                        required
                        aria-required='true'
                        type={show ? 'text' : 'password'}
                        placeholder='Confirm password'
                        fontSize='1.5rem'
                        onChange={(e) => setCpass(e.target.value)}
                        m='0 0 1.8rem 0'
                        padding={'0 0 0 5px'}
                    />
                    <InputRightElement marginRight={'0.5rem'}>
                        <Button h='1.75rem' onClick={() => setShow(!show)} >
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <FormLabel fontSize='1.5rem'>Upload your picture</FormLabel>
                <InputGroup size='lg'>
                    <Input
                        id='field-:r2'
                        type={'file'}
                        fontSize='1.5rem'
                        accept='image/*'
                        onChange={(e) => postDetails(e.target.files[0])}
                        m='0 0 1.8rem 0'
                        padding={'0 0 0 5px'}
                    />
                </InputGroup>

                <Button
                    colorScheme={'blue'}
                    width='100%'
                    height={'3rem'}
                    fontWeight={'bold'}
                    fontSize={'15px'}
                    onClick={submitHandler}>
                    Signup
                </Button>

            </FormControl>
        </Stack>
    )
}

export default Signup