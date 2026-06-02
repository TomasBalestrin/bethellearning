import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/DemoHome";
import LearningPathDetail from "./pages/LearningPathDetail";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import ProfilePage from "./pages/ProfilePage";
import { ManageCourses } from "./pages/ManageCourses";
import ManageCourseContent from "./pages/ManageCourseContent";
import CourseView from "./pages/CourseView";

function Router() {
  return (
    <Switch>
      <Route path={"/login"} component={Login} />
      <Route path={"/"} component={Dashboard} />
      <Route path="/trilha/:id" component={LearningPathDetail} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/users" component={UserManagement} />
      <Route path="/profile" component={ProfilePage} />
        <Route path="/admin/courses" component={ManageCourses} />
        <Route path="/admin/courses/:id" component={ManageCourseContent} />
        <Route path="/courses/:id" component={CourseView} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
