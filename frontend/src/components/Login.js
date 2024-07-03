import React, { useEffect, useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { Button, Input, FormControl, FormLabel, FormErrorMessage, Heading, Container, VStack, Box, IconButton, ChakraProvider, Text } from '@chakra-ui/react';
import classes from './Login.css';
import {json, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {userActions} from './store/userSlice'
import {USER_DATA}  from './data/data'

const Login = () => {
  let [toggleEye, setToggleEye] = useState(false);
  let dispatch =useDispatch();
  let [userData,setUserData]=useState(USER_DATA);
  let navigate =useNavigate()

  let [credMessages,setCredMessages]=useState(null);
  const { register, handleSubmit, formState: { errors },setValue } = useForm({
    defaultValues: {
      email: 'user@gmail.com',
      password: 'user1234'
    }
  });

  function onSubmit(values) {
    console.log("login--->>>",values);
    // console.log()
    const email =values.email
    const password =values.password
    const findData = userData.find(value=>value.email === email)
    console.log('findData---->',findData)
    if(!findData){
      setCredMessages("Email is invalid")
    }else if(findData.password !==values.password){
      setCredMessages("Password is Wrong")
    }else{
      // dispatch(findData)
      dispatch(userActions.loginClick(findData))
      navigate('/home')
      localStorage.setItem("email",email,);
      localStorage.setItem("password",password);
    }
  };
   function localCrede(){
     const storageEmail = localStorage.getItem('email');
     const storagePass=localStorage.getItem('password') ;
     if(storageEmail !== null && storagePass !== null){
        setValue("email",storageEmail)
        setValue("password",storagePass);
        onSubmit({ email: storageEmail, password: storagePass });
       setTimeout(()=>{
        localStorage.removeItem("email")
        localStorage.removeItem("password")
       },2000)
     }
   }

  useEffect(()=>{
    localCrede()
  },[])

  // console.log("message--->-->",credMessages)
  return (
    <ChakraProvider>
    <Container  display={"flex"} width={"100%"} alignItems={"center"} justifyContent={'center'} height={'90vh'} >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align='stretch' display={"flex"} gap={"1.5em"} >
        <Box textAlign='center'>
            <Heading>Welcome To The Portal</Heading>
          </Box>
          <Box>
            <Heading size='md'>Login</Heading>
          </Box>
          {credMessages !=null && <Text color="red.500" mt={2}>
                {credMessages}
              </Text>
              }
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input 
              id='email' 
              defaultValue="user@gmail.com"
              {...register('email', {
                required: 'Please enter email',
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Invalid email address'
                },
                minLength: {
                  value: 4,
                  message: 'Field requires at least 4 characters'
                }
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl  isInvalid={errors.password}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <div style={{display:'flex',gap:"1em",alignItems:"center"}}>          
              <Input 
              defaultValue='user1234'
              id='password' 
              type={toggleEye ? 'text' : 'password'}
              {...register('password', {
                required: 'Please enter password',
                minLength: {
                  value: 8,
                  message: 'Minimum 8 characters'
                }
              })}
            />
            <IconButton 
              aria-label='Toggle Password Visibility' 
              icon={<FontAwesomeIcon icon={toggleEye ? faEye : faEyeSlash} />} 
              onClick={() => setToggleEye(!toggleEye)} 
              variant='ghost'
              alignSelf='flex-end'
              mt={-8}
            />
            </div>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button colorScheme='teal' type='submit'>
            Login
          </Button>
        </VStack>
      </form>
    </Container>
    </ChakraProvider>
  );
}

export default Login;
