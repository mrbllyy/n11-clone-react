import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Account from './pages/Account/Account'
import Cart from './pages/Cart/Cart'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/hesabim" element={<Account />} />
            <Route path="/sepet" element={<Cart />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App


