export const USER_DATA=
[
  {
   name:'user',
   profile:null,
   email:'user@gmail.com',
   password:'user1234'
}
]

export const CUSTOMER_DATA =
 [
    {
      id: 9,
      customer: 11908,
      customer_profile: {
        id: 11908,
        name: "Ram",
        color: [182, 73, 99],
        email: "jesus_christ@church.com",
        pincode: "Mumbai",
        location_name: "Mumbai, Maharashtra, India",
        type: "C",
        profile_pic: null,
        gst: ""
      }
    },
    {
      id: 10,
      customer: 11909,
      customer_profile: {
        id: 11909,
        name: "John",
        color: [123, 104, 238],
        email: "john_apostle@church.com",
        pincode: "Delhi",
        location_name: "Delhi, India",
        type: "B",
        profile_pic: null,
        gst: "1234ABCDE"
      }
    }
  ];
  console.log("bjsjkfhajsa",JSON.stringify(CUSTOMER_DATA))

export const PRODUCT_DATA = [
    {
      display_id: 8,
      id: 209,
      owner: 1079,
      name: "New Product",
      category: "The god of War",
      characteristics: "New Product Characteristics",
      features: "",
      brand: "New Product Brand",
      sku: [
        {
          id: 248,
          selling_price: 54,
          max_retail_price: 44,
          customer: 11908,
          customer_profile: {
            id: 11908,
            name: "Ram",
            color: [182, 73, 99],
            email: "jesus_christ@church.com",
            pincode: "Mumbai",
            location_name: "Mumbai, Maharashtra, India",
            type: "C",
            profile_pic: null,
            gst: ""
          },
          product_details: [
            {
              id: 248,
              selling_price: 34,
              max_retail_price: 38,
              amount: 33,
              unit: "kg",
              quantity_in_inventory: 0,
              product: 209
            },
            {
              id: 247,
              selling_price: 32,
              max_retail_price: 32,
              amount: 33,
              unit: "kg",
              quantity_in_inventory: 0,
              product: 209
            },
            {
              id: 246,
              selling_price: 23,
              max_retail_price: 21,
              amount: 22,
              unit: "kg",
              quantity_in_inventory: 1,
              product: 209
            }
          ]
        },
        {
          id: 249,
          selling_price: 60,
          max_retail_price: 50,
          customer: 11909,
          customer_profile: {
            id: 11909,
            name: "John",
            color: [123, 104, 238],
            email: "john_apostle@church.com",
            pincode: "Delhi",
            location_name: "Delhi, India",
            type: "B",
            profile_pic: null,
            gst: "1234ABCDE"
          },
          product_details: [
            {
              id: 249,
              selling_price: 50,
              max_retail_price: 45,
              amount: 30,
              unit: "kg",
              quantity_in_inventory: 2,
              product: 209
            },
            {
              id: 250,
              selling_price: 55,
              max_retail_price: 49,
              amount: 31,
              unit: "kg",
              quantity_in_inventory: 3,
              product: 209
            }
          ]
        }
      ],
      updated_on: "2024-05-24T12:46:41.995873Z",
      adding_date: "2024-05-24T12:46:41.995828Z"
    },
    {
      display_id: 9,
      id: 210,
      owner: 1080,
      name: "Another Product",
      category: "Action Figures",
      characteristics: "High quality action figure",
      features: "Movable joints, Light-up features",
      brand: "Action Brand",
      sku: [
        {
          id: 251,
          selling_price: 80,
          max_retail_price: 70,
          customer: 11908,
          customer_profile: {
            id: 11908, 
            name: "Ram",
            color: [182, 73, 99],
            email: "jesus_christ@church.com",
            pincode: "Mumbai",
            location_name: "Mumbai, Maharashtra, India",
            type: "C",
            profile_pic: null,
            gst: ""
          },
          product_details: [
            {
              id: 251,
              selling_price: 75,
              max_retail_price: 70,
              amount: 50,
              unit: "pcs",
              quantity_in_inventory: 5,
              product: 210
            },
            {
              id: 252,
              selling_price: 70,
              max_retail_price: 65,
              amount: 45,
              unit: "pcs",
              quantity_in_inventory: 10,
              product: 210
            }
          ]
        }
      ],
      updated_on: "2024-05-25T10:30:00.123456Z",
      adding_date: "2024-05-25T10:30:00.123456Z"
    }
  ];
  
  export const SALE_ORDER_FORM_SCHEMA = [
    {
      customer_id: 11908,
      items: [
        {
          sku_id: 248,
          price: 34,
          quantity: 5
        },
        {
          sku_id: 249,
          price: 50,
          quantity: 3
        }
      ],
      paid: true,
      invoice_no: "Invoice - 1212122",
      invoice_date: "2024-07-06"
    },
    {
      customer_id: 11909,
      items: [
        {
          sku_id: 251,
          price: 75,
          quantity: 2
        }
      ],
      paid: false,
      invoice_no: "Invoice - 1212123",
      invoice_date: "2024-07-07"
    }
  ];
  
console.log("ssssssss",JSON.stringify(SALE_ORDER_FORM_SCHEMA))


