import React, { useEffect, useState } from 'react';
import { ChakraProvider, Input, ListItem, UnorderedList, Box } from '@chakra-ui/react';
import { Tag, TagLabel, TagCloseButton, HStack } from '@chakra-ui/react';
import { PRODUCT_DATA } from './data/data';


export const Tagify = ({ onSelect }) => {
  const handleSelect = (productName, productSku) => {
    onSelect(productName, productSku);
  };

  return (
    <ChakraProvider>
      <div style={{ margin: '0.5em' }}>
        <Box
          bg='tomato'
          w='100%'
          p={4}
          color='white'
          style={{ display: 'flex', gap: '0.1em', alignItems: 'center', flexWrap: 'wrap' }}
        >
          {PRODUCT_DATA.map((product, index) => (
            <HStack spacing={4} key={index}>
              <Tag size={'md'} borderRadius='full' variant='solid' colorScheme='green'>
                <TagLabel>{product.name}</TagLabel>
                <TagCloseButton onClick={() => handleSelect(product.name, product.sku)} />
              </Tag>
            </HStack>
          ))}
        </Box>
      </div>
    </ChakraProvider>
  );
};

