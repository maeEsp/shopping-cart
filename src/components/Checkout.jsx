import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart }) => {
    const navigate = useNavigate();
    const total = cart.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);

    const handlePayment = () => {
        alert("Payment Successful");
        navigate('/');
    };

    return (
        <div>
            <h2>Checkout</h2>
            <ul>
                {cart.map(({ product, quantity }) => (
                    <li key={product.id}>
                        {product.title} - ${product.price} x {quantity}
                    </li>
                ))}
            </ul>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={() => navigate(-1)}>Cancel</button>
            <button onClick={handlePayment}>Pay</button>
        </div>
    );
};

// Add prop types validation for cart and clearCart
Checkout.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            product: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
            }).isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
    // clearCart: PropTypes.func.isRequired,
};

export default Checkout;
