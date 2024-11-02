"use client"
import { useState } from "react"


const UpdateInvoiceForm = ({invoice, onUpdate, onCancel}) => {
    const [customerName, setCustomerName] = useState(invoice.customerName);
    const [itemName, setItemName] = useState(invoice.itemName);
    const [itemQuantity, setItemQuantity] = useState(invoice.itemQuantity);
    const [itemAmount, setItemAmount] = useState(invoice.itemAmount);
    const [datePurchased, setDatePurchased] = useState(invoice.datePurchased);
    const [paymentStatus, setPaymentStatus] = useState(invoice.paymentStatus);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({...invoice, customerName, itemName, itemQuantity, itemAmount, datePurchased, paymentStatus});
    };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 border bg-blue-950 rounded-md">
        <h3 className="text-2xl font-bold mb-4 text-white">Edit Invoice</h3>
        <div className="mb-2">
            <label htmlFor="" className='mb-1 block text-white text-xl'>Customer Name</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className='p-2 block w-full border rounded-md' />
        </div>
        <div className="mb-2 flex space-x-4">               
        <div className="flex-1">
            <label htmlFor="" className='mb-1 block text-white text-xl'>Item Name</label>
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className='p-2 w-full border rounded' />
        </div>
        <div className="flex-1">
            <label htmlFor="" className='mb-1 block text-white text-xl'>Item Quantity</label>
            <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} className='p-2 w-full border rounded'/>
        </div>
        </div>
        <div className="mb-2 flex space-x-4"> 
        <div className="flex-1">
            <label htmlFor="" className='mb-1 block text-white text-xl'>Item Amount</label>
            <input type="number" value={itemAmount} onChange={(e) => setItemAmount(e.target.value)} className='p-2 w-full border rounded' />
        </div>
        <div className="flex-1">
            <label htmlFor="" className='mb-1 block text-white text-xl'>Date Purchased</label>
            <input type="date" value={datePurchased} onChange={(e) => setDatePurchased(e.target.value)} className='p-2 w-full border rounded' />
        </div>
        </div>
    
        <div className="mb-4">
            <label htmlFor="" className='mb-1 block text-white text-xl'>Payment Status</label>
            <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className='p-2 w-full border rounded'>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
            </select>
        </div>
        <div className="mt-2 flex space-x-4"> 
        <button type="submit" className='bg-black text-white w-full rounded mr-1 py-1 px-3'>Update Invoice</button>
        <button onClick={onCancel} className="p-2 w-full bg-yellow-700 text-white font-bold rounded">Cancel</button>
        </div>
    </form>
  )
}

export default UpdateInvoiceForm;