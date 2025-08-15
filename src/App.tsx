import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Prompts from "./pages/Prompts";
import NotFound from "./pages/NotFound";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { PostHogProvider } from "@/components/PostHogProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PostHogProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/prompts" element={<Prompts />} />
            <Route path="/use-cases" element={<Navigate to="/prompts" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <AnalyticsDashboard />
      </TooltipProvider>
    </PostHogProvider>
  </QueryClientProvider>
);

export default App;
