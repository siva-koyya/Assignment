import React, { useState } from 'react';
import { Box, Heading, Card, CardBody, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Select, ChakraProvider, Tfoot } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUser } from '@fortawesome/free-solid-svg-icons';
import { PRODUCT_DATA } from '../data/data';
import theme from '../ScrollTheme'

const CardBodyComponent = ({ Skus, handleClick }) => {
  const [profile, setProfile] = useState(Skus);

  return (
    <ChakraProvider>
      <Card
        cursor="pointer"
        margin="0.5em"
        padding="0.2em"
        boxShadow="0px 0px 5px 0px rgba(0,0,0,0.75)"
        border=""
        height="fit-content"
        onClick={() => handleClick(profile)
        }
      >
        <CardBody display={"flex"} flexDirection={"column"} gap={'1em'}>
          <Box display="flex" justifyContent="space-between" fontFamily="" padding="">
            <div>
              <Heading size={"md"} color={profile.customer_profile.color} >
                {profile.customer_profile.name}
              </Heading>
              <p style={{ fontSize: "0.8em" }}><FontAwesomeIcon  icon={faLocationDot} /> {profile.customer_profile.location_name}</p>
            </div>
            <Heading size={"md"} >
              {profile.customer}
            </Heading>
          </Box>
          <Box display="flex" gap="1em" alignItems="center" >
            <Heading  size="sm" color="gray">Order Value:</Heading>
            <label style={{ fontSize: "0.8em" }}>Rs.{profile.max_retail_price}</label>
          </Box>
          <Box display="flex" gap="1em" alignItems="center">
            <Heading color="gray" as="h4" size="sm">Selling Price:</Heading>
            <label style={{ fontSize: "0.8em" }}>Rs.{profile.selling_price}</label>
          </Box>
        </CardBody>
      </Card>
    </ChakraProvider>
  );
};



const CustomerDetails = ({ details }) => {
  return (
    <ChakraProvider theme={theme} >
      <Box  className='box'
 overflowY="auto"
 style={{
    // width: "100%",
    // Adjust the height of the div
    // overflowY: "auto",
    height:"90vh", // Enable vertical scrollbar
    scrollbarWidth: "thin", // Adjust the width of the scrollbar
    scrollbarColor: "green",
     // Adjust the color of the scrollbar thumb and track
    borderRadius: "0.25rem", // Adjust the border radius of the scrollbar thumb and track
  }}
       display={"flex"} flexDirection={"column"} gap={"2rem"} overflow={"auto"} padding={"1em"} >
        <Box borderRadius="0.5em" paddingBottom="0.3em" color="white" fontSize="1em" height="8vh" display="flex" alignItems="center" justifyContent="space-around" gap="24em" backgroundColor="#8BE78B" margin="0.2em" position="sticky" top="10px">
          <Heading size={"md"}>{details.customer_profile.name}</Heading>
          <Heading size={"md"}>{details.customer_profile.email}</Heading>
        </Box>
        <Box>
          <ul style={{ display: "flex", alignItems: 'center', gap: '1em' }} >
            <li style={{ display: "flex", alignItems: 'center', gap: '1em' }}>
              <FontAwesomeIcon icon={faUser} />
              <p>{details.customer_profile.email}</p>
            </li>
            <li style={{ display: "flex", alignItems: 'center', gap: '1em' }}>
              <FontAwesomeIcon icon={faLocationDot} />
              <p>{details.customer_profile.location_name}</p>
            </li>
            <li style={{ display: "flex", alignItems: 'center', gap: '1em' }}>
              <Heading as="h4" size={"sm"}>Pincode :</Heading>
               <p>{details.customer_profile.pincode}</p>
            </li>
          </ul>
        </Box>
        <Box>
          <ul style={{ listStyleType: "none", display: "flex", flexWrap: "wrap", gap: "0.8em" }}>
            <li style={{ display: "flex", alignItems: "center", gap: "0.8em" }}>
              <Heading size={"sm"}>Saletype:</Heading>
              <label>{details.customer_profile.type}</label>
            </li>
            {/* Other details can be displayed similarly */}
          </ul>
        </Box>
        <Box>
          <Heading as="h4" size={"md"}>Sales Order items</Heading>
          <br></br>
          <Box width="100%">
            <Table variant='striped' colorScheme='teal' width={"100%"}>
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Ordered Quantity</Th>
                  <Th isNumeric>Selling Price</Th>
                  <Th isNumeric>Max Retail Price</Th>
                  <Th isNumeric>Amount</Th>
                  <Th isNumeric>Unit</Th>
                  <Th isNumeric>Quantity Inventory</Th>
                </Tr>
              </Thead>
              <Tbody>
                {details.product_details.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.product}</Td>
                    <Td isNumeric>{item.quantity_in_inventory}</Td>
                    <Td isNumeric>{item.selling_price}</Td>
                    <Td isNumeric>{item.max_retail_price}</Td>
                    <Td isNumeric>{item.amount}</Td>
                    <Td isNumeric>{item.unit}</Td>
                    <Td isNumeric>{item.quantity_in_inventory}</Td>
                  </Tr>
                ))}
              </Tbody>
             
            </Table>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};



  

const Category = ({ customerData }) => {
  const [product, setProduct] = useState(customerData);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleCardClick = (profile) => {
    setSelectedProfile(profile);
  };

  return (

    <Box>
      <Select
        value={product.name}
        onChange={(e) => setProduct(e.target.value)}
        mb="1em"
        borderColor="green.400"
        borderRadius="md"
        borderWidth="1px"
        px="2"
        py="1"
        size='md'
        _focus={{ outline: 'none' }}
      >
        {PRODUCT_DATA.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </Select>
      <Heading fontSize="1.2em">{product.name}</Heading>
      <Box display="flex" gap="0.5em" overflowY="auto">
        <Box border="1px solid green" width="30%" height="90vh" overflowY="auto">
          {product.sku && product.sku.map((Sku, index) =>
            <CardBodyComponent key={Sku.id} Skus={Sku} handleClick={handleCardClick} />
          )}
        </Box>
        <Box width="70%" height="90vh" overflowY="auto" boxShadow="0px 0px 5px 0px rgba(0,0,0,0.75)">
          {selectedProfile && <CustomerDetails details={selectedProfile} />}
        </Box>
      </Box>
    </Box>
  );
};

function Customer() {
  const [product, setProduct] = useState(PRODUCT_DATA[0]);

  return (
    <ChakraProvider theme={theme}>
    <Box border={'gray'} fontSize={"medium"} >
      <Category customerData={product} />
    </Box>
    </ChakraProvider>
  );
}

export default Customer;

