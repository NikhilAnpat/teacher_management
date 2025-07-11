import './globals.css';
import type { Metadata } from 'next';
import { ToastProvider } from '../components/FeedbackToast';

export const metadata: Metadata = {
  title: 'Teacher Management',
  description: 'Modern teacher management system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-950">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
