import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./Routes";

const App = () => (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
);

export default App;