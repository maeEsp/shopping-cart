import PropTypes from 'prop-types';

const Cart = ({ cart, updateQuantity, removeFromCart, clearCart, checkout }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    return (
            <div className="w-3/12 mx-auto p-6 pt-20 bg-zinc-100 shadow-lg ">
                <h2 className="text-3xl mb-2 text-left">Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="divide-y border-t divide-gray-300 mb-6">
                            {cart.map(({ product, quantity }) => (
                                <li key={product.id} className="flex items-center space-x-4 py-4">
                                    <img src={product.images[0]} alt={product.title} className="w-16 h-16 object-cover " />
                                    <div className="flex-1">
                                        <p className="font-medium">{product.title}</p>
                                        <p className="text-gray-500">${product.price} x {quantity}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => updateQuantity(product, quantity + 1)}
                                            className="px-2 py-1 text-sm font-bold text-gray-950"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => updateQuantity(product, quantity - 1)}
                                            disabled={quantity === 1}
                                            className={`px-2 py-1 text-sm font-bold ${quantity === 1 ? 'text-gray-300' : 'text-gray-900 '} `}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(product)}
                                        className="ml-4 px-3 py-1 text-sm border border-neutral-700 text-neutral-700 bg-neutral-50"
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
                                className="px-4 py-2 border border-neutral-700 text-neutral-700 bg-neutral-50"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={checkout}
                                className="px-4 py-2 border border-neutral-700 text-neutral-700 bg-neutral-50"
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
