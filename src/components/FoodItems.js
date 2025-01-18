import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FoodItems = () => {
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        fetch('./data/feeds.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch food items');
                }
                return response.json();
            })
            .then((data) => {
                setFoodItems(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const updateQuantity = (id, change) => {
        setCart(
            cart
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + change }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const checkout = () => {
        alert('Order placed successfully!');
        setCart([]);
        navigate('/checkout');
    };

    const handleCartToggle = () => {
        setShowCart(!showCart);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Available Food's</h2>
            <div className="row">
                {foodItems.map((item) => (
                    <div className="col-md-3 mb-3" key={item.id}>
                        <div className="card shadow-sm p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h5 className="card-title text-center">{item.name}</h5>
                                <img
                                    src={item.image}
                                    className="img-fluid"
                                    alt="food item"
                                />
                                <p className="card-text text-center">{item.description}</p>
                                <p className="card-text text-center">Price: Rs. {item.price}</p>
                            </div>
                            <div className="card-footer text-center">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => addToCart(item)}
                                >
                                    + Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <button
                    className="btn btn-info"
                    onClick={handleCartToggle}
                >
                    View Cart
                </button>
            </div>

            <Modal show={showCart} onHide={handleCartToggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                {item.name} - Rs. {item.price} x {item.quantity}{' '}
                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                            </li>
                        ))}
                    </ul>
                    <h4>
                        Total: Rs.
                        {cart.reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                        )}
                    </h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCartToggle}>
                        Close
                    </Button>
                    <Button variant="success" onClick={checkout}>
                        SAVE AND Placed Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FoodItems;
