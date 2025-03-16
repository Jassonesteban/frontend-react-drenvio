import ProductList from "./ProductList";

const Main = () => {
  return (
    <main className="flex-grow container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Promociones.....siempre!
      </h1>
      <ProductList />
    </main>
  );
};

export default Main;
