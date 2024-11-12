import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Department Store</h2>
            <input
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-6 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card p-4 border max-h-auto border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <img
                            src={product.images[0]} 
                            alt={product.title} 
                            className="w-full h-48 object-cover rounded-lg mb-4" 
                        />
                        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                        <p className="text-gray-700 mb-4">Price: ${product.price}</p>
                        <button
                            onClick={() => addToCart(product)}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Define prop types
ProductList.propTypes = {
    addToCart: PropTypes.func.isRequired,
};

export default ProductList;