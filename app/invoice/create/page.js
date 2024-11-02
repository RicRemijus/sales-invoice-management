"use client";
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';


const AddInvoiceForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemAmount, setItemAmount] = useState('');
    const [datePurchased, setDatePurchased] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('Paid');
    const [itemReceipt, setItemReceipt] = useState(null);

    const router = useRouter();

    const handleFileChange = (e) =>{
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader();
            reader.onload = () =>{ 
            setItemReceipt(reader.result); //save as a base64 string
            };
            reader.readAsDataURL(file); //read file as a data url
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const invoice = {
            customerName, itemName, itemQuantity, itemAmount, datePurchased, paymentStatus,
            itemReceipt: itemReceipt, 
        };

        //save invoice to localstorage
        const existingInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
        existingInvoices.push(invoice);
        localStorage.setItem('invoices', JSON.stringify(existingInvoices));

        router.push('/');
    };


  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 flex flex-col space-y-4 mt-6 border bg-gray-300 rounded-lg shadow-md'>
        <h2 className="text-lg font-bold mb-4">Add Invoice</h2>
        <div className="mb-1">
            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Customer Name</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className='w-full p-2 border rounded' required />
        </div>
        <div className="mb-1">
            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Item Name</label>
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className='w-full p-2 border rounded' required />
        </div>
        <div className="mb-1">
            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Item Quantity</label>
            <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} className='w-full p-2 border rounded' required />
        </div>
        <div className="mb-1">
            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Item Amount</label>
            <input type="number" value={itemAmount} onChange={(e) => setItemAmount(e.target.value)} className='w-full p-2 border rounded' required />
        </div>
        <div className="mb-1">
            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Date Purchased</label>
            <input type="date" value={datePurchased} onChange={(e) => setDatePurchased(e.target.value)} className='w-full p-2 border rounded' required />
        </div>
        <div className="mb-1">
            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Item Receipt</label>
            <input type="file" accept='image/png, image/jpeg, application/pdf' onChange={handleFileChange} className='w-full p-2 border rounded' required />
        </div>
        <div className="mb-3">
            <label htmlFor="" className='block text-sm font-medium text-gray-700'>Payment Status</label>
            <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className='w-full p-2 border rounded'>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
            </select>
        </div>
        <button type="submit" className='bg-black text-white w-full rounded py-1 px-3'>Save Invoice</button>
    </form>
  )
}

export default AddInvoiceForm;