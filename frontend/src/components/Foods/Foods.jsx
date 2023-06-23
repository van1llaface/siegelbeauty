import BasicTable from '../Menus/BasicTable';

function Foods({ menu, foods, handleAddToCart, handleAmountChange }) {
  return (
    <div>
      {foods.map((food) => {
        return (
          <div>
            <BasicTable
              foods={foods}
              handleAddToCart={handleAddToCart}
              handleAmountChange={handleAmountChange}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Foods;
