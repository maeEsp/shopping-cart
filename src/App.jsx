import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CheckoutPage from './pages/CheckoutPage';

const App = () => {
    const [cart, setCart] = useState([]);

    const clearCart = () => setCart([]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home cart={cart} />} />
                <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
            </Routes>
        </Router>
        
        
    );
};

export default App;
