import { useState } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const itemIndex = prevCart.findIndex(item => item.product.id === product.id);
            if (itemIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[itemIndex].quantity += 1;
                return updatedCart;
            }
            return [...prevCart, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (product, quantity) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.product.id === product.id ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (product) => {
        setCart((prevCart) => prevCart.filter(item => item.product.id !== product.id));
    };

    // Clear Cart function
    const clearCart = () => {
        setCart([]); // Set cart to an empty array
    };

    const checkout = () => {
        navigate('/checkout', { state: { cart } });  // Pass cart as state to checkout
    };

    return (
        <main className='bg-neutral-100'>
            <div className='flex'>
                <ProductList addToCart={addToCart} />
                <Cart 
                    cart={cart} 
                    updateQuantity={updateQuantity} 
                    removeFromCart={removeFromCart} 
                    clearCart={clearCart} // Pass clearCart as a prop
                    checkout={checkout}  // Use checkout function
                />
            </div>
        </main>

    );
};

export default Home;
