"use client";
import React, { useState, useEffect } from "react";
import { Payment, Teacher } from '../../types';
import { useToast } from '../../components/FeedbackToast';
import PaymentsLoading from './loading';
import PaymentViewModal from '../../components/PaymentViewModal';

// Sample teachers (copied from teachers page)
const initialTeachers: Teacher[] = [
  { id: '1', name: 'Alyina Allan', email: '', phone: '', address: '', hourRate: 45, qualifications: [], groupQualifications: [], schedule: [] },
  { id: '2', name: 'John Smith', email: '', phone: '', address: '', hourRate: 50, qualifications: [], groupQualifications: [], schedule: [] },
  { id: '3', name: 'Priya Patel', email: '', phone: '', address: '', hourRate: 40, qualifications: [], groupQualifications: [], schedule: [] },
  { id: '4', name: 'Chen Wang', email: '', phone: '', address: '', hourRate: 55, qualifications: [], groupQualifications: [], schedule: [] },
  { id: '5', name: 'Maria Garcia', email: '', phone: '', address: '', hourRate: 48, qualifications: [], groupQualifications: [], schedule: [] },
  { id: '6', name: 'Sarah Lee', email: '', phone: '', address: '', hourRate: 52, qualifications: [], groupQualifications: [], schedule: [] },
  { id: '7', name: 'David Kim', email: '', phone: '', address: '', hourRate: 47, qualifications: [], groupQualifications: [], schedule: [] },
  { id: '8', name: 'Emily Clark', email: '', phone: '', address: '', hourRate: 53, qualifications: [], groupQualifications: [], schedule: [] },
];

const mockPayments: Payment[] = [
  { id: '1', teacherId: '1', amount: 200, date: '2024-07-01', status: 'completed' },
  { id: '2', teacherId: '2', amount: 150, date: '2024-07-05', status: 'pending' },
  { id: '3', teacherId: '3', amount: 300, date: '2024-07-10', status: 'completed' },
  { id: '4', teacherId: '4', amount: 180, date: '2024-07-12', status: 'failed' },
  { id: '5', teacherId: '5', amount: 220, date: '2024-07-15', status: 'completed' },
  { id: '6', teacherId: '6', amount: 250, date: '2024-07-18', status: 'pending' },
  { id: '7', teacherId: '7', amount: 210, date: '2024-07-20', status: 'completed' },
  { id: '8', teacherId: '8', amount: 190, date: '2024-07-22', status: 'completed' },
];

const PaymentsPage = () => {
  // All hooks at the top!
  const [amount, setAmount] = useState<number>(200); // Default in rupees
  const [teacherId, setTeacherId] = useState<string>(initialTeachers[0]?.id || '');
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [filter, setFilter] = useState('');
  const { showToast } = useToast();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Effects
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <PaymentsLoading />;

  // Filtered payments
  const filteredPayments = payments.filter(p => {
    const teacher = initialTeachers.find(t => t.id === p.teacherId);
    return (
      (!filter || teacher?.name.toLowerCase().includes(filter.toLowerCase()))
    );
  });

  // Razorpay integration
  const handlePayment = () => {
    if (!razorpayLoaded) {
      showToast('Payment gateway is still loading. Please try again in a moment.', 'error');
      return;
    }
    if (!teacherId || !amount || isNaN(amount) || amount < 1) {
      showToast('Please select a teacher and enter a valid amount (min ₹1).', 'error');
      return;
    }
    const teacher = initialTeachers.find(t => t.id === teacherId);
    const options = {
      key: "rzp_test_WhHBo7UBzSDCwl",
      amount: amount * 100, // Convert rupees to paise
      currency: "INR",
      name: "Nikhil Anpat Teaching",
      description: `Payment for ${teacher?.name}`,
      image: "https://example.com/your-logo.png",
      handler: function (response: { razorpay_payment_id: string }) {
        showToast(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        setPayments([
          ...payments,
          {
            id: (payments.length + 1).toString(),
            teacherId,
            amount: amount,
            date: new Date().toISOString().slice(0, 10),
            status: 'completed',
          },
        ]);
      },
      prefill: {
        name: teacher?.name,
        email: teacher?.email || 'test.user@example.com',
        contact: teacher?.phone || '8888169835',
      },
      notes: {
        address: teacher?.address || '',
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.on("payment.failed", (...args: any[]) => {
      const response = args[0] as { error: { description: string } };
      showToast(`Payment failed! Error: ${response.error.description}`, 'error');
    });
    paymentObject.open();
  };

  // Payment View Modal logic
  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowViewModal(true);
  };

  // Stats
  const total = payments.length;
  const completed = payments.filter(p => p.status === 'completed').length;
  const pending = payments.filter(p => p.status === 'pending').length;
  const failed = payments.filter(p => p.status === 'failed').length;

  return (
    <div className="w-full min-h-screen p-0 sm:p-4 bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Payments</h1>
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{total}</div>
            <div className="text-xs text-gray-500">Total Payments</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{completed}</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{pending}</div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">{failed}</div>
            <div className="text-xs text-gray-500">Failed</div>
          </div>
        </div>
        {/* Razorpay Payment Card */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mb-8 max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2">Razorpay Payment</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-4">Pay a teacher securely using Razorpay</p>
          <div className="flex flex-col gap-3">
            <select
              value={teacherId}
              onChange={e => setTeacherId(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              disabled={initialTeachers.length === 0}
            >
              {initialTeachers.length === 0 ? (
                <option value="">No teachers available</option>
              ) : (
                initialTeachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))
              )}
            </select>
            <input
              type="number"
              min={1}
              step={1}
              placeholder="Amount (INR)"
              value={amount}
              onChange={e => setAmount(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button
              onClick={handlePayment}
              className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
              disabled={!razorpayLoaded || !teacherId || !amount || isNaN(amount) || amount < 1}
            >
              {razorpayLoaded ? `Pay ₹${amount}` : 'Loading Payment Gateway...'}
            </button>
            <p className="text-center text-gray-500 text-sm mt-2">
              Powered by <span className="text-blue-500 font-semibold">Razorpay</span>
            </p>
          </div>
        </div>
        {/* Payment History */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment History</h2>
            <input
              type="text"
              placeholder="Search by teacher name..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>
          <div className="overflow-x-auto rounded-lg shadow max-h-[340px] overflow-y-auto">
            <table className="min-w-full bg-white dark:bg-gray-900 text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Teacher</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Amount</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Date</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(payment => {
                  const teacher = initialTeachers.find(t => t.id === payment.teacherId);
                  return (
                    <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{teacher?.name || payment.teacherId}</td>
                      <td className="px-4 py-2 text-blue-700 dark:text-blue-400 font-semibold">₹{payment.amount}</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{payment.date}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          payment.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button onClick={() => handleViewPayment(payment)} className="text-blue-600 hover:underline mr-2">View</button>
                        {payment.status === 'failed' && (
                          <button className="text-red-600 hover:underline">Retry</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <PaymentViewModal
          open={showViewModal}
          onClose={() => setShowViewModal(false)}
          payment={selectedPayment}
          teacher={initialTeachers.find(t => t.id === selectedPayment?.teacherId) || null}
        />
      </div>
    </div>
  );
};

export default PaymentsPage; 