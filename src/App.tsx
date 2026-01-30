import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Particles from "../components/reactbits/Particles";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import SimpleAdminDashboardNew from "./pages/SimpleAdminDashboardNew";
import Projects from "./pages/Projects";
import Purchase from "./pages/Purchase";
import ProjectDetail from "./pages/ProjectDetail";
import Team from "./pages/Team";
import Guide from "./pages/Guide";
import Contact from "./pages/Contact";
import GetStarted from "./pages/GetStarted";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import QuickSetup from "@/components/admin/QuickSetup";
import Settings from "./pages/Settings";
import AddProject from "./pages/AddProject";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <div className="relative z-10">
            <Toaster />
            <Sonner />
            <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/team" element={<Team />} />
              <Route path="/how-to-use" element={<Guide />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/user-dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin-dashboard" element={
                <ProtectedRoute requireAdmin>
                  <SimpleAdminDashboardNew />
                </ProtectedRoute>
              } />
              <Route path="/add-project" element={
                <ProtectedRoute>
                  <AddProject />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="/purchase/:projectId" element={<Purchase />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/setup" element={<QuickSetup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
          <Particles className="fixed inset-0 z-40 pointer-events-none" />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
