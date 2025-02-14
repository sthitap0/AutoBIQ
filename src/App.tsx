import { ClerkProvider, RedirectToSignIn, SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import MemberDashboard from './pages/MemberDashboard';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <SignedIn>
            <Navbar />
          </SignedIn>
          <Routes>
            <Route path="/" element={
              <SignedOut>
                <div className="min-h-screen flex items-center justify-center">
                  <RedirectToSignIn redirectUrl="/member"/>
                </div>
              </SignedOut>
            } />
            <Route path="/admin" element={
              <SignedIn>
                <AdminDashboard />
              </SignedIn>
            } />
            <Route path="/member/*" element={
              <SignedIn>
                <MemberDashboard />
              </SignedIn>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
}