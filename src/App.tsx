import AppRoutes from "./routes";
import { ProductProvider } from "./store/ProductContext";
import { UserProvider } from "./store/UserContext";

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <AppRoutes />
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
