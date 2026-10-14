import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import AdminNavbar from "./components/AdminNavbar";

import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import AddCategory from "./pages/AddCategory";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-black flex flex-col">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
          <AdminNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          <main className="p-4 sm:p-6 lg:p-8 flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/categories" element={<AddCategory />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
