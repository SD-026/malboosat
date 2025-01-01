import React from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { LoginForm } from './components/auth/LoginForm';
import { AdminDashboard } from './components/admin/Dashboard';
import { SellerDashboard } from './components/seller/Dashboard';
import { CustomerProfile } from './components/customer/Profile';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { products } from './data/products';

function MainContent() {
  const { user, isAuthenticated } = useAuth();
  const [showCart, setShowCart] = React.useState(false);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  if (user?.role === 'seller') {
    return <SellerDashboard />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
        <button
          onClick={() => setShowCart(!showCart)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showCart ? 'View Products' : 'View Cart'}
        </button>
      </div>

      {showCart ? (
        <Cart />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <MainContent />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;