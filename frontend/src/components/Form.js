import { useFieldArray, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import {
  FormErrorMessage, Checkbox, FormLabel, FormControl, Input, Button, ButtonGroup, ChakraProvider, Container,
  Card, CardBody, CardFooter, Box, Stack, Divider, UnorderedList, ListItem
} from '@chakra-ui/react';
import { useState } from 'react';
import { CUSTOMER_DATA, PRODUCT_DATA, SALE_ORDER_FORM_SCHEMA } from './data/data';
import { Tagify } from './Tagify';

export default function HookForm() {
  const { handleSubmit, register,setValue, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      customer_id: '',
      items: [{ sku_id: '', price: '', quantity: '' }],
      paid: false,
      invoice_no: '',
      invoice_date: format(new Date(), 'yyyy-MM-dd')
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const [isChecked, setIsChecked] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isTagify,isSetTagify] = useState([]) 
  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);
    const filtered = PRODUCT_DATA.filter(product =>
      product.name.toLowerCase().includes(inputValue)
    );
    setFilteredProducts(filtered);//searched data
  };

  const onSubmit = (values) => {
    console.log('Submitted Data:', values); //submission form
  };

  const handleProductSelect = (productName, productSku) => {
    console.log(productName,"formmmmmmmname")
    console.log(productName,"formmmmmmmSku");
    isSetTagify((prevValue)=>(
      [...prevValue,productSku]
    )
    );
    const lastItemIndex = fields.length - 1;
    if (lastItemIndex >= 0) {
      // Populate SKU ID
      setValue(`items[${lastItemIndex}].sku_id`, productSku);
    }
    console.log("tagify",isTagify)
  };
  const handleTagify =(value)=>{
    isSetTagify(value);
  }

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <ChakraProvider>
      <Container maxW='container.lg' p={6} boxShadow="0px 0px 3px gray">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name} mb={4}>
            <div>
              <FormLabel htmlFor='name'>First name</FormLabel>
              <Input
                id='name'
                placeholder='name'
                {...register('name', {
                  required: 'This is required',
                  minLength: { value: 4, message: 'Minimum length should be 4' },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </div>
          </FormControl>

          <FormControl isInvalid={errors.customer_id} mb={4}>
            <div>
              <FormLabel htmlFor='customer_id'>Customer Id</FormLabel>
              <Input
                id='customer_id'
                placeholder='customer id'
                {...register('customer_id', {
                  required: 'This is required',
                  minLength: { value: 4, message: 'Minimum length should be 4' },
                })}
              />
              <FormErrorMessage>
                {errors.customer_id && errors.customer_id.message}
              </FormErrorMessage>
            </div>
          </FormControl>

          <FormControl isInvalid={errors.customer_id} mb={4}>
              {/* {product Names needed and Sku Data} */}
            <div>
              <FormLabel>Product</FormLabel>
              <Input
                placeholder="Search products..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              {searchInput && (
                <Box
                overflow='auto'
                marginTop='0.2em'
                bg='white'
                width='100%'
                maxHeight='40vh'
                boxShadow='0px 0px 2px gray'
                zIndex='1'
                position='absolute'
                >
                  <UnorderedList listStyleType='none'>
                    {filteredProducts.map((product, index) => (
                      <ListItem
                        key={index}
                        fontSize='medium'
                        padding='0.5em'
                        _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                        onClick={() => handleProductSelect(product)}
                      >
                        {product.name}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Box>
              )}
              <FormErrorMessage>
                {errors.customer_id && errors.customer_id.message}
              </FormErrorMessage>
            </div>
          </FormControl>
            <FormControl>
            <FormLabel>Selected Products</FormLabel>
            {/* {Need To Modify Data and fields} */}
            <Tagify products={fields} />
          </FormControl>
          {fields.map((item, idx) => (
            <Box key={item.id} mt={4}>
              <Card>
                <CardBody>
                  <Stack mt={6} spacing={3}>
                    <FormControl isInvalid={errors.items?.[idx]?.sku_id}>
                      <FormLabel htmlFor={`items[${idx}].sku_id`}>SKU ID</FormLabel>
                      <Input
                        id={`items[${idx}].sku_id`}
                        placeholder='SKU ID'
                        {...register(`items[${idx}].sku_id`, {
                          required: 'This is required',
                        })}
                      />
                      <FormErrorMessage>
                        {errors.items?.[idx]?.sku_id && errors.items[idx].sku_id.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.items?.[idx]?.price}>
                      <FormLabel htmlFor={`items[${idx}].price`}>Price</FormLabel>
                      <Input
                        id={`items[${idx}].price`}
                        placeholder='Price'
                        {...register(`items[${idx}].price`, {
                          required: 'This is required',
                        })}
                      />
                      <FormErrorMessage>
                        {errors.items?.[idx]?.price && errors.items[idx].price.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.items?.[idx]?.quantity}>
                      <FormLabel htmlFor={`items[${idx}].quantity`}>Quantity</FormLabel>
                      <Input
                        id={`items[${idx}].quantity`}
                        placeholder='Quantity'
                        {...register(`items[${idx}].quantity`, {
                          required: 'This is required',
                        })}
                      />
                      <FormErrorMessage>
                        {errors.items?.[idx]?.quantity && errors.items[idx].quantity.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing={2}>
                    <Button variant='solid' colorScheme='red' onClick={() => { remove(idx) }}>
                      Remove
                    </Button>
                    <Button variant='ghost' colorScheme='blue' onClick={() => { append({ sku_id: '', price: '', quantity: '' }) }}>
                      Add
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Box>
          ))}

          <FormControl isInvalid={errors.paid} mb={4}>
            <div>
              <FormLabel htmlFor='paid'>Payment</FormLabel>
              <Checkbox id='paid' onChange={handleCheck} isChecked={isChecked}>Payment</Checkbox>
              <FormErrorMessage>
                {errors.paid && errors.paid.message}
              </FormErrorMessage>
            </div>
          </FormControl>

          <FormControl isInvalid={errors.invoice_no} mb={4}>
            <div>
              <FormLabel htmlFor='invoice_no'>Invoice Number</FormLabel>
              <Input
                id='invoice_no'
                placeholder='invoice Number'
                {...register('invoice_no', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage>
                {errors.invoice_no && errors.invoice_no.message}
              </FormErrorMessage>
            </div>
          </FormControl>

          <FormControl isInvalid={errors.invoice_date} mb={4}>
            <div>
              <FormLabel htmlFor='invoice_date'>Invoice Date</FormLabel>
              <Input
                placeholder='Select Date and Time'
                size='md'
                type='datetime-local'
                {...register('invoice_date', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage>
                {errors.invoice_date && errors.invoice_date.message}
              </FormErrorMessage>
            </div>
          </FormControl>

          <Button mt={4} colorScheme='teal' type='submit' isLoading={isSubmitting}>
            Submit
          </Button>
        </form>
      </Container>
    </ChakraProvider>
  );
}





// import { useFieldArray, useForm } from 'react-hook-form'
// import {format} from 'date-fns'
// import { FormErrorMessage, Checkbox,FormLabel, FormControl,Input, Button,Stack,Divider,ButtonGroup, ChakraProvider} from '@chakra-ui/react'
// import { Select,Container } from '@chakra-ui/react'
// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
// import { SALE_ORDER_FORM_SCHEMA } from './data/data'
// import { Tagify } from './Tagify'
// import { useState } from 'react'


// export default function HookForm({Sku}) {
//     let [data,setData]=useState(Sku ? Sku : null)
//     console.log('---.formm',data);
//   const { handleSubmit, register,control, formState: { errors, isSubmitting },} = useForm(data ? data :{
//     defaultValues: {
//       name:'',
//       customer_id: '',
//       items: [{ sku_id: '', price: '', quantity: '' }],
//       paid: false,
//       invoice_no: '',
//       invoice_date: format(new Date(), 'yyyy-MM-dd')
//     }
//   })

//   const {fields,append,remove}=useFieldArray({
//     control,
//     name: 'items'
// })

//  let [isCheked,setIsChecked]=useState(false)

//   function onSubmit(values) {
    
//    console.log(values)
//   }

//   function HandleCheck(e){
//       setIsChecked(e.target.checked)
//   }
//  const skuss= {sku: [
//     {
//     id: 248,
//     selling_price: 54,
//     max_retail_price: 44,
//     id:9,
//     customer: 11908,
//     customer_profile:{
//     id: 11908,
//     name: "Ram",
//     color: [
//     182,
//     73,
//     99
//     ],
//     email: "jesus_christ@church.com",
//     pincode: "Mumbai",
//     location_name: "Mumbai, Maharashtra, India",
//     type: "C",
//     profile_pic: null,
//     gst: ""
//     },
//     product_details:[
//     {
//     id: 248,
//     selling_price: 34,
//     max_retail_price: 38,
//     amount: 33,
//     unit: "kg",
//     quantity_in_inventory: 0,
//     product: 209
//     },
// ]
//  }]}
 
//   return (
//     <ChakraProvider>   
//      <Container maxW='container.sm' bg='green.400' color='#262626' style={{boxShadow: "0px 0px 3px gray"}}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {skuss.sku.map((sku,index)=>
//         <FormControl isInvalid={errors.name}>
//             <div>
//             <FormLabel htmlFor='name'>First name</FormLabel>
//             <Input onChange={(e)=>{
//             // e.target.value
//             }} defaultValue={ skuss ? sku.customer_profile.name  :""}
//             id='name'
//             placeholder='name'
//             {...register('name', {
//                 required: 'This is required',
//                 minLength: { value: 4, message: 'Minimum length should be 4' },
//             })}
//             />
//             <FormErrorMessage>
//             {errors.name && errors.name.message}
//             </FormErrorMessage>
//             </div>
//             <div>
//             <FormLabel htmlFor='customer_id'>Customer Id </FormLabel>
//             <Input
//             defaultValue={skuss ? sku.customer_profile.id : ''}
//             id='customer_id'
//             placeholder='customer id'
//             {...register('customer_id', {
//                 required: 'This is required',
//                 minLength: { value: 4, message: 'Minimum length should be 4' },
//             })}  
//             />
//             <FormErrorMessage>
//             {errors.customer_id && errors.customer_id?.message}
//             </FormErrorMessage>
//             </div>
//             <div>
//             <FormLabel>Product</FormLabel>

//             <Tagify Product={sku.product_details}/>
//             <FormErrorMessage>
//             {errors.customer_id && errors.customer_id.message}
//             </FormErrorMessage>
//                </div>
//             {sku.product_details.map((items,index)=>(
//                 <div key={items.id} style={{marginTop:"1em"}} >
//                 <Card 
//                 //  direction={{  }}
//                 //  overflow='hidden'
//                 //  variant='outline'
//                   >
//                     <CardBody>
//                         <Stack mt='6' spacing='3'>
//                 <div>
//                     <FormLabel htmlFor={`items[${index}].sku_id`}>SKU ID : {data ? data :items.sku_id}</FormLabel>
//                     </div>
//                     <div>
//                     <FormLabel htmlFor={`items[${index}].sku_id`}>Price : {items.quantity}</FormLabel>
//                     </div>
//                     <div>
//                     <FormLabel htmlFor={`items[${index}].sku_id`}>Quantity : ₹{items.price}</FormLabel>
//                     </div>
//         </Stack>
//      </CardBody> 
//     <Divider />
//     <CardFooter>
//         <ButtonGroup spacing='2'>
//         <Button variant='solid' colorScheme='red' onClick={()=>{remove(index)}}>
//             Remove
//         </Button>
//         <Button variant='ghost' colorScheme='blue' onClick={()=>{append({sku_id:'',price:'',quantity:''})}}>
//             Add
//         </Button>
//         </ButtonGroup>
//     </CardFooter>
//     </Card>   
//                 </div>      
//             ))}
        
//         <div>
//             <FormLabel htmlFor='name'>Payment</FormLabel>
//             {/* <Input
//             id='name'
//             placeholder='name'
//             {...register('name', {
//                 required: 'This is required',
//                 // minLength: { value: 4, message: 'Minimum length should be 4' },
//             })} */}
            
//             {/* /> */}
//             <Checkbox id='paid' onChange={(e)=>{
//                 HandleCheck(e)
//             }} checked={isCheked} defaultChecked={''}>Payment</Checkbox>
//             <FormErrorMessage>
//             {errors.paid &&errors.paid.message}
//             </FormErrorMessage>
        
//             </div>
//             <div>
//             <FormLabel htmlFor='name'>Invoice Number</FormLabel>
//             <Input
//             id='invoice_no'
//             placeholder='invoice Number'
//             {...register('invoice_no', {
//                 required: 'This is required',
//                 // minLength: { value: 4, message: 'Minimum length should be 4' },
//             })}
            
//             />
//             <FormErrorMessage>
//             {errors.name &&errors.name.message}
//             </FormErrorMessage>
        
//             </div>
//             <div>
//             <FormLabel htmlFor='name'>Invoice Date</FormLabel>
//             <Input placeholder='Select Date and Time' size='md' type='datetime-local'
//             {...register('invoice_Date', {
//                 required: 'This is required',
//             })} />
//             <FormErrorMessage>
//             {errors.invoice_date &&errors.invoice_date.message}
//             </FormErrorMessage>
        
//             </div>
//             </FormControl>
//           )}  
//         <Button mt={4} colorScheme='teal'type='submit'>
//             Submit
//         </Button>
//         </form>
//   </Container>
//   </ChakraProvider>


//   )
// }