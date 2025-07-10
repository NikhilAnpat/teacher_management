"use client";
import React, { useState } from 'react';
import { Payment } from '../../types';
import { useToast } from '../../components/FeedbackToast';

const mockPayments: Payment[] = [
  { id: '1', teacherId: '1', amount: 200, date: '2024-07-01', status: 'completed' },
  { id: '2', teacherId: '2', amount: 150, date: '2024-07-05', status: 'pending' },
];

const PaymentsPage = () => {
  const [amount, setAmount] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [payments, setPayments] = useState(mockPayments);
  const { showToast } = useToast();

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherId || !amount) {
      showToast('All fields are required.', 'error');
      return;
    }
    setPayments([
      ...payments,
      {
        id: (payments.length + 1).toString(),
        teacherId,
        amount: Number(amount),
        date: new Date().toISOString().slice(0, 10),
        status: 'pending',
      },
    ]);
    setTeacherId('');
    setAmount('');
    showToast('Payment added successfully!', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Payments</h1>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-2">Add Payment</h2>
        <form onSubmit={handleAddPayment}>
          <input type="text" placeholder="Teacher ID" value={teacherId} onChange={e => setTeacherId(e.target.value)} className="w-full mb-2 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} className="w-full mb-2 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Submit</button>
        </form>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Payment History</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Teacher ID</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="border-t border-gray-200 dark:border-gray-800">
                <td className="py-2">{payment.teacherId}</td>
                <td className="py-2">${payment.amount}</td>
                <td className="py-2">{payment.date}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${payment.status === 'completed' ? 'bg-green-100 text-green-700' : payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsPage; 