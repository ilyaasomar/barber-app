import { ThemeProvider } from "./components/theme-provider";
import Routers from "./routes/routers";

function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routers />
      </ThemeProvider>
    </div>
  );
}

export default App;
