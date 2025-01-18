import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const updateQuantity = (id, change) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); 
      return updatedCart;
    });
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Your Cart</h1>

      {cart.length > 0 ? (
        <div className="row">
          <div className="col-md-8">
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  {cart.map((item) => (
                    <ListGroup.Item key={item.id}>
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong>{item.name}</strong><br />
                          Rs. {item.price} x {item.quantity}
                        </div>
                        <div className="text-right">
                          <strong>Total: Rs. {item.price * item.quantity}</strong>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="secondary"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4">
            <Card className="mb-4">
              <Card.Body>
                <h5>Cart Summary</h5>
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>Rs. {totalAmount}</span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span>Shipping:</span>
                  <span>Rs. 0</span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span><strong>Total:</strong></span>
                  <span><strong>Rs. {totalAmount}</strong></span>
                </div>
                <Button variant="success" className="w-100 mt-3" href="/thankyou">
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Button variant="primary" href="/fooditems">
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
