"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import UpdateInvoiceForm from "./invoice/page";

export default function Home() {
  const [invoices, setInvoices] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [editInvoice, setEditInvoice] = useState(null)

    useEffect(()=>{
        const savedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
        setInvoices(savedInvoices);
        calculateTotal(savedInvoices);
    },[]);

    const calculateTotal = (invoices) => {
        const total = invoices.reduce((acc, invoice)=> acc + parseFloat(invoice.itemAmount) * parseInt(invoice.itemQuantity), 0);
        setTotalAmount(total);
    }


    const handleDelete = (index) =>{
        const updatedInvoices = invoices.filter((_, i) => i !== index);
        setInvoices(updatedInvoices);
        localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
        calculateTotal(updatedInvoices);
    }

    const handleEdit = (index) =>{
        setEditInvoice({...invoices[index], index});
    }
    const handleUpdate = (updatedInvoice) =>{
        const updatedInvoices = invoices.map((invoice, i) =>
        i === updatedInvoice.index ? updatedInvoice: invoice);
        setInvoices(updatedInvoices);
        localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
        calculateTotal(updatedInvoices);
        setEditInvoice(null);
    };


    const filteredInvoices = invoices.filter(invoice => {
        const invoiceData = new Date(invoice.datePurchased);
        const withinDateRange = 
            (!startDate || invoiceData >= new Date(startDate)) &&
            (!endDate || invoiceData <= new Date(endDate));
        const statusMatches = filterStatus == 'All' || invoice.paymentStatus === filterStatus;
        return withinDateRange &&  statusMatches;
    });

    const resetfilters = () =>{
        setFilterStatus('All');
        setStartDate('');
        setEndDate('');
    };
  return (
    <div className="">
     <Navbar/>

     <div className='max-w-5xl mx-auto p-4'>
        <p className="text-xl">At Total Secure, we secure you</p>
        <h1 className="text-2xl font-bold mb-10">Sales Invoice Management App</h1>
        <div className="mb-4 flex justify-between">
        <div className="mb-1">
        <label htmlFor="paymentstatus" className='block mb-1 text-white p-2 bg-orange-600 border rounded'>Filter By Payment Status</label>
            <select onChange={(e) => setFilterStatus(e.target.value)} className='mr-2 p-2 w-full border rounded'>
                <option value="All">All</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
            </select>
        </div>
        <div className="mb-1">
            <label htmlFor="startDate" className='block mb-1 text-white p-2 bg-orange-600 border rounded'>Filter By Start Date</label>
            <input type="date" value={startDate} onChange={(e)=> setStartDate(e.target.value)} className='mr-2 p-2 w-full border rounded' />
        </div>
          <div className="mb-1">
          <label htmlFor="endDate" className='block mb-1 text-white p-2 bg-orange-600 border rounded'>Filter By End Date</label>
          <input type="date" value={endDate} onChange={(e)=> setEndDate(e.target.value)} className="mr-2 p-2 w-full border rounded" />
          </div>
            <button type="submit" onClick={resetfilters} className='ml-2 p-2 h-10 bg-indigo-700  text-white rounded'>Reset Filters</button>
        </div>
        {filteredInvoices.length > 0 ? (
            <table className="min-w-full border-collapse border border-gray-300">
                <thead >
                    <tr className='bg-gray-500 text-white border'>
                        <th className="border border-gray-200 p-2">Customer Name</th>
                        <th className="border border-gray-200 p-2">Item Name</th>
                        <th className="border border-gray-200 p-2">Quantity</th>
                        <th className='border border-gray-200 p-2'>Amount</th>
                        <th className="border border-gray-200 p-2">Date Purchased</th>
                        <th className="border border-gray-200 p-2">Receipt</th>
                        <th className="border border-gray-200 p-2">Payment Status</th>
                        <th className="border border-gray-200 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInvoices.map((invoice, index) => (
                        <tr key={index}>
                            <td className="border border-gray-200 p-2">{invoice.customerName}</td>
                            <td className="border border-gray-200 p-2">{invoice.itemName}</td>
                            <td className="border border-gray-200 p-2">{invoice.itemQuantity}</td>
                            <td className="border border-gray-200 p-2">{invoice.itemAmount}</td>
                            <td className="border border-gray-100 p-2">
                            {(() => {
                                const date = new Date(invoice.datePurchased);
                                const options = {day:'numeric', month:'long', year:'numeric'};
                                return `${date.toLocaleDateString('en-GB', options).replace(/(\d+)(\s+)(\w+)/, '$1 $2$3,')}`;
                            
                            })()}

                            </td>
                            <td className="border border-gray-200 p-2">
                                {invoice.itemReceipt && (
                                    <>
                                    {invoice.itemReceipt.startsWith('data:image/') ? (
                                        <img src={invoice.itemReceipt} alt="itemReceipt" className='h-14 w-44' />
                                    ): (    
                                        <iframe src={invoice.itemReceipt} width="100%" height="10" title='Receipt' frameBorder="0"></iframe>
                                    )}
                                    </>
                                )}
                            </td>
                            <td className="border border-gray-200 p-2">
                                   <span className={`${invoice.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-yellow-600'} px-6 py-1 text-white w-full rounded`}>
                                      {invoice.paymentStatus}
                                    </span>
                            </td>
                            <td className="border border-gray-200 p-2 flex justify-between">
                                <button onClick={() => handleEdit(index)} className="bg-indigo-500 text-white p-1 mr-2 rounded">Edit</button>
                                <button onClick={() => handleDelete(index)} className="text-white bg-[red] p-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p className="text-center text-red-500 font-bold">No invoice submitted</p>
        )}
        <>
        <div className="mb-2 flex justify-between">  
            <div className="">     
             <Link href="/invoice/create" className="mt-4 inline-block bg-[green] py-1 px-4 border rounded text-xl text-white">Add New Invoice </Link>
             </div>   
             <div className="">      
              <h2 className="text-lg font-bold mt-4 w-full">Total Amount:  <span className="bg-indigo-900 text-white rounded-md border px-2 py-1">&#8358;{totalAmount.toFixed(2)}</span></h2>
             </div>
        </div>
        </>
          
        {editInvoice && (
            <UpdateInvoiceForm  invoice={editInvoice} onUpdate={handleUpdate} onCancel={()=> setEditInvoice(null)} />
        )}
        
  
        
    </div>
    </div>
  );
}
