import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MenuStyles from "./Menus.module.css";
import AddIcon from "@mui/icons-material/Add";
import Foods from "./../Foods/Foods";
import BasicTable from "./BasicTable";
import PositionedSnackbar from "../Cart/Snackbar";
import { AuthContext } from "../../context/AuthContext";

function Menus() {
  const [menus, setMenus] = useState([]);
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(undefined);
  const [amount, setAmount] = useState(1);
  const [submitMessage, setSubmitMessage] = useState("");
  const [activeMenu, setActiveMenu] = useState("");

  const { loggedIn } = useContext(AuthContext);

  const foodsURL = "http://localhost:3000/foods";
  const menusURL = "http://localhost:3000/menus";
  const cartURL = "http://localhost:3000/cart";

  useEffect(() => {
    try {
      axios.get(menusURL).then((res) => setMenus(res.data));
      axios.get(foodsURL).then((res) => setFoods(res.data));
    } catch {
      setError(error.response.data);
    }
  }, []);

  const handleAmountChange = (event, food) => {
    const newAmount = event.target.value;
    const updatedFoods = foods.map((f) => {
      if (f.foodName === food.foodName && f.menuName === food.menuName) {
        const updatedFood = { ...f };
        updatedFood.selectedAmount = newAmount;
        updatedFood.selectedPrice = newAmount * f.price;
        return updatedFood;
      }
      return f;
    });
    setFoods(updatedFoods);
  };

  const handleAddToCart = (food) => {
    try {
      const { foodName } = food;
      const amount = food.selectedAmount || 1;
      const foodPrice = food.price * amount;

      axios.post(cartURL, {
        foodName: foodName,
        amount: amount,
        foodPrice: foodPrice,
      });
      setSubmitMessage("Successfully added item to cart!");
      setTimeout(() => {
        setSubmitMessage("");
      }, 2000);
    } catch (error) {
      setError(error);
    }
  };

  const filteredFoods = foods
    .filter((food) => food.menuName === activeMenu)
    .map((food) => {
      const updatedFood = { ...food };
      updatedFood.selectedAmount = updatedFood.selectedAmount || 1;
      updatedFood.selectedPrice =
        updatedFood.price * updatedFood.selectedAmount;
      return updatedFood;
    });

  return (
    <>
      {loggedIn ? (
        <>
          <div className={`${MenuStyles.container} ${MenuStyles.shadow}`}>
            {menus.map((menu) => {
              const isActive = activeMenu && activeMenu === menu.menuName;
              const menuClass = isActive
                ? `${MenuStyles.menu} ${MenuStyles.active}`
                : MenuStyles.menu;
              return (
                <div
                  key={menu.menuName}
                  onClick={() => setActiveMenu(menu.menuName)}
                  className={menuClass}
                >
                  {menu.menuName}
                </div>
              );
            })}
          </div>
          {!activeMenu ? (
            <div className={MenuStyles.prompt}>
              <p>Please select a service!</p>
            </div>
          ) : (
            <div className={MenuStyles.table}>
              <BasicTable
                foods={filteredFoods}
                handleAddToCart={handleAddToCart}
                handleAmountChange={handleAmountChange}
              />
              {(error || submitMessage) && (
                <PositionedSnackbar
                  open={!!error || !!submitMessage}
                  message={error || submitMessage}
                  onClose={() => {
                    setError("");
                    setSubmitMessage("");
                  }}
                  isError={!!error}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <div className={MenuStyles.prompt}>
          <p>Please log in!</p>
        </div>
      )}
    </>
  );
}

export default Menus;
