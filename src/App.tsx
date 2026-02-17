import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import Routers from "./routes/routers";

function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routers />
        <Toaster />
      </ThemeProvider>
    </div>
  );
}

export default App;
