export const totalPrice = (cartItems) => {
  let totalPrice = 0;

  for (const item of cartItems) {
    totalPrice += item.foodPrice;
  }

  return (totalPrice*1.21).toFixed(2);
};
