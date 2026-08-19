import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><Toaster /><Suspense fallback={<main aria-busy="true" />}><Home /></Suspense></ThemeProvider></ErrorBoundary>;
}

export default App;
