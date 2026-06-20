import {BrowserRouter, Routes, Route } from "react-router-dom";


import Dashboard from "./pages/Dashboard/Dashboard";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import EditProduct from "./pages/EditProduct/EditProduct";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Dashboard />} />
        <Route path="/create" element={< CreateProduct />} />
        <Route path="/product/:id" element={< ProductDetails />} />
        <Route path="/edit/:id" element={< EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;