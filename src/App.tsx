import AppRoutes from "./routes";
import { UserProvider } from "./store/UserContext";

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
