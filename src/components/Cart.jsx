import PropTypes from 'prop-types';

const Cart = ({ cart, updateQuantity, removeFromCart, clearCart, checkout }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Cart</h2>
            {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="divide-y divide-gray-200 mb-6">
                        {cart.map(({ product, quantity }) => (
                            <li key={product.id} className="flex items-center space-x-4 py-4">
                                <img src={product.category.image} alt={product.title} className="w-16 h-16 object-cover rounded-lg" />
                                <div className="flex-1">
                                    <p className="font-medium">{product.title}</p>
                                    <p className="text-gray-500">${product.price} x {quantity}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => updateQuantity(product, quantity + 1)}
                                        className="px-2 py-1 text-sm font-bold bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => updateQuantity(product, quantity - 1)}
                                        disabled={quantity === 1}
                                        className={`px-2 py-1 text-sm font-bold ${quantity === 1 ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md`}
                                    >
                                        -
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(product)}
                                    className="ml-4 px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t pt-4 mt-6 space-y-2 text-lg">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (12%):</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={clearCart}
                            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={checkout}
                            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                            Check Out
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

Cart.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            product: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                images: PropTypes.arrayOf(PropTypes.string).isRequired,
            }).isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
    updateQuantity: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    checkout: PropTypes.func.isRequired,
};

export default Cart;
