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
        <div className="w-9/12 mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center"></h2>
            <input
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-6 w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="product-card flex flex-col p-4"
                    >
                        <img
                            src={product.images[0]} 
                            alt={product.title} 
                            className="w-full h-72 object-cover mb-4" 
                        />
                        <div className="flex-1">
                            <h3 className="text-3xl font-semibold mb-2">{product.title}</h3>
                            <p className="text-gray-700 text-lg mb-4">Price: ${product.price}</p>
                        </div>
                        <button
                            onClick={() => addToCart(product)}
                            className="w-8/12 py-2 px-4 border border-neutral-700 text-neutral-700 bg-neutral-50 mt-auto mx-auto"
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
