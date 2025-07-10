import './globals.css';
import type { Metadata } from 'next';
import Layout from '../components/Layout';
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
          <Layout>{children}</Layout>
        </ToastProvider>
      </body>
    </html>
  );
}
