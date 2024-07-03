import React from 'react';
import { Box, Button, ChakraProvider, Flex } from '@chakra-ui/react'; // Import Chakra components
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <ChakraProvider>
    <Box zIndex={999} as="nav" className='nav' bg="green.400" borderRadius="0.5em" pos="sticky" top="1px"> {/* Use Box component as a wrapper */}
      <Flex align="center">
        <ul className="nav-ul">
          <li className='navContainer-1'>
            <Button className='nav b-1' bgColor="red.500" color="white" borderRadius="0.3em" height="5vh">
              <Link to={"/home"}>ActiveSale </Link>
              </Button> {/* Use Button component */}
            <Button className='nav b-1' bgColor="red.500" color="white" borderRadius="0.3em" height="5vh"> 
              <Link to={"completedSale"}>CompletedSale </Link>
            </Button>
          </li>
          <li className='navContainer-2'>
            <Button className='nav b-2' bgColor="red.500" color="white" borderRadius="0.3em" height="5vh">
           
            <Link to={"AddSale"}>+ Sale </Link>

            </Button>
          </li>
        </ul>
      </Flex>
    </Box>
    </ChakraProvider>
  );
}

export default Nav;
