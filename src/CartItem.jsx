import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    removeItem, 
    updateQuantity, 
    selectCartItems,
    selectCartTotal 
} from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ 
            name: item.name, 
            quantity: item.quantity + 1 
        }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ 
                name: item.name, 
                quantity: item.quantity - 1 
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">
        Shopping Cart ({calculateTotalQuantity()} items)
      </h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button 
            className="get-started-button" 
            onClick={handleContinueShopping}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.name}>
                <img 
                  className="cart-item-image" 
                  src={item.image} 
                  alt={item.name} 
                />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">${item.cost}</div>
                  <div className="cart-item-quantity">
                    <button 
                      className="cart-item-button" 
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="cart-item-button" 
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    Subtotal: ${calculateTotalCost(item)}
                  </div>
                  <button 
                    className="cart-item-remove" 
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              Total: ${calculateTotalAmount()}
            </div>
            <div className="cart-actions">
              <button 
                className="get-started-button" 
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button 
                className="get-started-button1" 
                onClick={handleCheckoutShopping}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;