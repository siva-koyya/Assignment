import React, { useState,useEffect } from 'react';
import '../ActiveSale/ActiveSale.css';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, ChakraProvider, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { PRODUCT_DATA } from '../data/data';
import ActiveModalComponent from './ActiveSaleForm';

function ActiveSaleComponent() {
    const [data, setProduct] = useState(PRODUCT_DATA);
    const product = useSelector((state) => state.sale.products);
    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editData,setEditData]                = useState(null)
    const openFormData = (id) => {
        const selected = data.find(item => item.id === id);
        setSelectedProduct(selected);
    };

    return (
        <ChakraProvider>
            <div className='t-container'>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Customer Name</Th>
                            <Th>Price</Th>
                            <Th>Last Modified</Th>
                            <Th>View/Edit</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && data.map((value, index) => (
                            <Tr key={index}>
                                <Td>{value.id}</Td>
                                <Td style={{ display: "flex", alignItems: "center", gap: "1.5em" }}>
                                    <Avatar src={`${value.sku[0].customer_profile.profile_pic}`} />
                                    <span>{value.sku[0].customer_profile.name}</span>
                                </Td>
                                <Td>{value.sku[0].selling_price}</Td>
                                <Td>{new Date(value.updated_on).toLocaleDateString()}</Td>
                                <Td>
                                    <Button onClick={() => openFormData(value.id)}>
                                        View/Edit
                                    </Button>
                                    {selectedProduct && selectedProduct.id === value.id && (
                                        <ActiveModalComponent product={selectedProduct} isOpen={true} editData={editData} onClose={() => setSelectedProduct(null)} />
                                    )}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
        </ChakraProvider>
    );
}

export default ActiveSaleComponent;
