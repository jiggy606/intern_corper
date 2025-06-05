import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./Routes";

const App = () => (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
);

export default App;