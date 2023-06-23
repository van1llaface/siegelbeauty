import CartStyles from './Cart.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { totalPrice } from '../../utils/totalPrice';
import SpanningTable from './SpanningTable';
import Button from '@mui/material/Button';
import PositionedSnackbar from './Snackbar';

function Cart() {
  const [cart, setCart] = useState([]);
  const cartURL = 'http://localhost:3000/cart/';
  const [error, setError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  const orderURL = 'http://localhost:3000/orders';
  const currentUserURL = 'http://localhost:3000/users/getName';

  useEffect(() => {
    try {
      axios.get(cartURL).then((res) => setCart(res.data));
      axios.get(currentUserURL).then((res) => setCurrentUser(res.data));
    } catch {
      setError(error.response.data);
    }
  }, [cart]);

  const handleDelete = (id) => {
    try {
      axios.delete(cartURL + id);
      setSubmitMessage('Successfully removed an item');
      setTimeout(() => {
        setSubmitMessage('');
      }, 2000);
    } catch (error) {
      setError(error.response.data);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  const handleOrder = () => {
    try {
      if (cart.length < 1) {
        setError('Cart is empty!');
        return;
      }

      const foods = cart.map((item) => ({
        foodName: item.foodName,
        foodAmount: item.amount,
        foodPrice: item.foodPrice,
      }));

      axios
        .post(orderURL, {
          customerName: currentUser.name,
          customerEmail: currentUser.email,
          totalPrice: totalPrice(cart),
          foods: foods,
        })
        .then(() => {
          setSubmitMessage('Order placed succesfully!');
          axios
            .delete(cartURL)
            .catch((error) => setError(error.response.data.error));
        });
    } catch (error) {
      setError(error.response.data);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <div className={CartStyles.container}>
      {cart.length > 0 ? (
        <>
          <SpanningTable cart={cart} handleDelete={handleDelete} />
          <Button variant='outlined' onClick={handleOrder}>
            Order
          </Button>
          {(error || submitMessage) && (
            <PositionedSnackbar
              open={!!error || !!submitMessage}
              message={error || submitMessage}
              onClose={() => {
                setError('');
                setSubmitMessage('');
              }}
              isError={!!error}
            />
          )}
        </>
      ) : (
        <p className={CartStyles.message}>Cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
