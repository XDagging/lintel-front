import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Header } from './components/Header';
import { Toaster } from './components/Toaster';
import { useAuthStore } from './store/authStore';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import JobTracking from './pages/JobTracking';
import JobsList from './pages/JobsList';
import WorkerDashboard from './pages/WorkerDashboard';
import WorkerRegister from './pages/WorkerRegister';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  if (user) return <Navigate to={user.role === 'worker' ? '/worker/dashboard' : '/book'} replace />;
  return <>{children}</>;
}

function ProtectedRoute({ children, workerOnly = false }: { children: React.ReactNode; workerOnly?: boolean }) {
  const { user } = useAuthStore();

  console.log("This is the user retrieved from the protected route:", user)
  if (!user) return <Navigate to="/login" replace />;
  if (workerOnly && user.role !== 'worker') {
    console.log("tried to access worker place without being a worker")
    return <Navigate to="/book" replace />;
  }


  if (!workerOnly && user.role === 'worker') { 
    console.log("Dashboard")
    return <Navigate to="/worker/dashboard" replace />};
  return <>{children}</>;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  return (
    <>
      {user && <Header />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/worker/register" element={<WorkerRegister />} />
              <Route path="/terms"   element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/blog"    element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              <Route path="/book" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/jobs" element={<ProtectedRoute><JobsList /></ProtectedRoute>} />
              <Route path="/jobs/:id" element={<ProtectedRoute><JobTracking /></ProtectedRoute>} />
              <Route path="/worker/dashboard" element={<ProtectedRoute workerOnly><WorkerDashboard /></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
