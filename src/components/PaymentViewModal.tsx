"use client";
import React, { useRef } from 'react';
import { Payment, Teacher } from '../types';

interface PaymentViewModalProps {
  open: boolean;
  onClose: () => void;
  payment: Payment | null;
  teacher: Teacher | null;
}

const PaymentViewModal: React.FC<PaymentViewModalProps> = ({ open, onClose, payment, teacher }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!payment) return;
    try {
      const content = `
Payment Receipt
===============

Teacher: ${teacher?.name || payment.teacherId}
Amount: ₹${payment.amount}
Date: ${payment.date}
Status: ${payment.status}

Teacher Email: ${teacher?.email || 'N/A'}
Teacher Phone: ${teacher?.phone || 'N/A'}
Teacher Address: ${teacher?.address || 'N/A'}
      `;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Payment_${teacher?.name?.replace(/\s+/g, '_') || payment.teacherId}_${payment.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const sharePayment = async () => {
    if (!payment) return;
    const shareText = `Payment to ${teacher?.name || payment.teacherId}: ₹${payment.amount} on ${payment.date} (Status: ${payment.status})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Payment Receipt',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Payment details copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  if (!open || !payment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Details</h2>
          <div className="flex gap-2">
            <button
              onClick={sharePayment}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Share
            </button>
            <button
              onClick={generatePDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
        <div ref={contentRef} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Teacher</label>
            <p className="text-gray-900 dark:text-white font-semibold">{teacher?.name || payment.teacherId}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Amount</label>
            <p className="text-blue-700 dark:text-blue-400 font-semibold">₹{payment.amount}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Date</label>
            <p className="text-gray-900 dark:text-white">{payment.date}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              payment.status === "completed"
                ? "bg-green-100 text-green-700"
                : payment.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}>
              {payment.status}
            </span>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Teacher Email</label>
            <p className="text-gray-900 dark:text-white">{teacher?.email || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Teacher Phone</label>
            <p className="text-gray-900 dark:text-white">{teacher?.phone || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Teacher Address</label>
            <p className="text-gray-900 dark:text-white">{teacher?.address || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentViewModal; 