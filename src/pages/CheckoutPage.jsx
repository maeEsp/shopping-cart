import PropTypes from 'prop-types';
import Checkout from '../components/Checkout';

const CheckoutPage = ({ cart, clearCart }) => (
    <div>
        <Checkout cart={cart} clearCart={clearCart} />
    </div>
);

CheckoutPage.propTypes = {
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
    clearCart: PropTypes.func.isRequired,
};

export default CheckoutPage;
