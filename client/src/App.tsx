// Replit Auth integration - see blueprint:javascript_log_in_with_replit
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import LandingPage from "@/pages/LandingPage";
import HomePage from "@/pages/HomePage";
import ResultsPage from "@/pages/ResultsPage";
import IntegrationPage from "@/pages/IntegrationPage";
import PublicFeedbackPage from "@/pages/PublicFeedbackPage";
import AboutPage from "@/pages/AboutPage";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* Public feedback submission route */}
      <Route path="/f/:linkId" component={PublicFeedbackPage} />

      {/* Show landing page for unauthenticated users */}
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={LandingPage} />
          <Route path="/about" component={AboutPage} />
        </>
      ) : (
        <>
          {/* Authenticated routes */}
          <Route path="/" component={HomePage} />
          <Route path="/results" component={ResultsPage} />
          <Route path="/integration" component={IntegrationPage} />
          <Route path="/about" component={AboutPage} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const { isAuthenticated, isLoading } = useAuth();
  
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  // Show public routes without sidebar
  if (window.location.pathname.startsWith("/f/")) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Show landing page without sidebar for unauthenticated users
  if (isLoading || !isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Show authenticated layout with sidebar
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-4 border-b">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-auto">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
