import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { format } from 'date-fns';

const SaleOrderForm = ({ onSubmit }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
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

  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      invoice_date: format(new Date(data.invoice_date), 'M/d/yyyy')
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label htmlFor="customer_id">Customer ID</label>
        <input
          id="customer_id"
          type="number"
          {...register("customer_id", { required: "Customer ID is required" })}
        />
        {errors.customer_id && <p>{errors.customer_id.message}</p>}
      </div>

      <div>
        <label>Items</label>
        {fields.map((item, index) => (
          <div key={item.id}>
            <label htmlFor={`items[${index}].sku_id`}>SKU ID</label>
            <input
              id={`items[${index}].sku_id`}
              type="number"
              {...register(`items[${index}].sku_id`, { required: "SKU ID is required" })}
            />
            {errors.items && errors.items[index]?.sku_id && <p>{errors.items[index].sku_id.message}</p>}

            <label htmlFor={`items[${index}].price`}>Price</label>
            <input
              id={`items[${index}].price`}
              type="number"
              {...register(`items[${index}].price`, { required: "Price is required" })}
            />
            {errors.items && errors.items[index]?.price && <p>{errors.items[index].price.message}</p>}

            <label htmlFor={`items[${index}].quantity`}>Quantity</label>
            <input
              id={`items[${index}].quantity`}
              type="number"
              {...register(`items[${index}].quantity`, { required: "Quantity is required" })}
            />
            {errors.items && errors.items[index]?.quantity && <p>{errors.items[index].quantity.message}</p>}

            <button type="button" onClick={() => remove(index)}>Remove Item</button>
          </div>
        ))}
        <button type="button" onClick={() => append({ sku_id: '', price: '', quantity: '' })}>
          Add Item
        </button>
      </div>

      <div>
        <label htmlFor="paid">Paid</label>
        <input
          id="paid"
          type="checkbox"
          {...register("paid")}
        />
      </div>

      <div>
        <label htmlFor="invoice_no">Invoice No</label>
        <input
          id="invoice_no"
          {...register("invoice_no", { required: "Invoice No is required" })}
        />
        {errors.invoice_no && <p>{errors.invoice_no.message}</p>}
      </div>

      <div>
        <label htmlFor="invoice_date">Invoice Date</label>
        <input
          type="date"
          id="invoice_date"
          {...register("invoice_date", { required: "Invoice Date is required" })}
        />
        {errors.invoice_date && <p>{errors.invoice_date.message}</p>}
      </div>

      <button type="submit">Create Sale Order</button>
    </form>
  );
};

export default SaleOrderForm;
