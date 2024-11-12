// import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();  // Get the cart items passed via state
    const cart = state?.cart || []; // Default to an empty array if no cart is passed via state
    const total = cart.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);

    const handlePayment = () => {
        alert("Payment Successful");
        localStorage.removeItem('cart');  // Remove cart from localStorage
        navigate('/', { replace: true, state: { cart: [] } });
    };

    return (
        <main className='bg-neutral-200 min-h-screen'>

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h2 className="text-3xl mb-6 text-center">Checkout</h2>
            {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="space-y-4">
                        {cart.map(({ product, quantity }) => (
                            <li key={product.id} className="flex items-center space-x-4">
                                <img
                                    src={product.images[0]} // Assuming first image is the main image
                                    alt={product.title}
                                    className="w-48 h-48 object-cover "
                                />
                                <div className="flex-1 px-4 ">
                                    <p className="font-medium text-gray-800">{product.title}</p>
                                    <p className="text-gray-500">${product.price} x {quantity}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">${(product.price * quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 border-t pt-4 space-y-2 text-lg">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Subtotal:</span>
                            <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Tax (12%):</span>
                            <span className="font-semibold text-gray-900">${(total * 0.12).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>${(total + total * 0.12).toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 w-24  border border-neutral-700 text-neutral-700 bg-neutral-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePayment}
                            className="px-4 py-2 w-24  border border-neutral-700 text-neutral-700 bg-neutral-50"
                        >
                            Pay
                        </button>
                    </div>
                </div>
            )}
        </div>
        </main>

    );
};


export default CheckoutPage;
