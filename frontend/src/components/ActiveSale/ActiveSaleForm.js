import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Checkbox, Stack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { saleActions } from '../store/saleSlice';
function ActiveModalComponent({ product, isOpen, onClose,editData }) {

    const dispatch  = useDispatch()   
    const { handleSubmit, control, formState: { errors, isSubmitting },reset } = useForm({
        defaultValues: {
            name: product.sku[0].customer_profile.name,
            customer_id: product.sku[0].customer,
            items: product.sku[0].product_details.map(detail => ({
                sku_id: detail.id,
                price: detail.selling_price,
                quantity: detail.amount
            })),
            paid: false,
            invoice_no: '',
            invoice_date: format(new Date(), 'yyyy-MM-dd')
        }
    });
     
    const ModifiedData =()=>{
        reset(editData)
    } 
    const onSubmit = values => {
        onClose();
        console.log(values)
        dispatch(saleActions.EditData(values))

    };
        useEffect(()=>{
            if(isOpen && editData){
                // ModifiedData()
                reset(editData)
            }
        },[isOpen,editData])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Product</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <Stack spacing={4}>
                            <FormControl isInvalid={errors.name}>
                                <FormLabel htmlFor="name">Customer Name</FormLabel>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                    rules={{ required: 'This is required' }}
                                />
                            </FormControl>
                            <FormControl isInvalid={errors.customer_id}>
                                <FormLabel htmlFor="customer_id">Customer ID</FormLabel>
                                <Controller
                                    name="customer_id"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                    rules={{ required: 'This is required' }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Items</FormLabel>
                                {product.sku[0].product_details.map((item, index) => (
                                    <Stack key={item.id} spacing={3}>
                                        <FormControl isInvalid={errors.items?.[index]?.sku_id}>
                                            <FormLabel htmlFor={`items[${index}].sku_id`}>SKU ID</FormLabel>
                                            <Controller
                                                name={`items[${index}].sku_id`}
                                                control={control}
                                                render={({ field }) => <Input {...field} />}
                                                rules={{ required: 'This is required' }}
                                            />
                                        </FormControl>
                                        <FormControl isInvalid={errors.items?.[index]?.price}>
                                            <FormLabel htmlFor={`items[${index}].price`}>Price</FormLabel>
                                            <Controller
                                                name={`items[${index}].price`}
                                                control={control}
                                                render={({ field }) => <Input {...field} />}
                                                rules={{ required: 'This is required' }}
                                            />
                                        </FormControl>
                                        <FormControl isInvalid={errors.items?.[index]?.quantity}>
                                            <FormLabel htmlFor={`items[${index}].quantity`}>Quantity</FormLabel>
                                            <Controller
                                                name={`items[${index}].quantity`}
                                                control={control}
                                                render={({ field }) => <Input {...field} />}
                                                rules={{ required: 'This is required' }}
                                            />
                                        </FormControl>
                                    </Stack>
                                ))}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="paid">Payment</FormLabel>
                                <Controller
                                    name="paid"
                                    control={control}
                                    render={({ field }) => <Checkbox {...field} />}
                                />
                            </FormControl>
                            <FormControl isInvalid={errors.invoice_no}>
                                <FormLabel htmlFor="invoice_no">Invoice Number</FormLabel>
                                <Controller
                                    name="invoice_no"
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                    rules={{ required: 'This is required' }}
                                />
                            </FormControl>
                            <FormControl isInvalid={errors.invoice_date}>
                                <FormLabel htmlFor="invoice_date">Invoice Date</FormLabel>
                                <Controller
                                    name="invoice_date"
                                    control={control}
                                    render={({ field }) => <Input type="datetime-local" {...field} />}
                                    rules={{ required: 'This is required' }}
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                            Save
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}

export default ActiveModalComponent;
