import Header from "../../components/Header/Header";
import MainStyles from "./MainPage.module.css";
import { Route, Routes } from "react-router-dom";
import Home from "../../components/Home/Home";
import Menus from "../../components/Menus/Menus";
import { AuthContext } from "./../../context/AuthContext";
import { useContext, useEffect } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import Admin from "../../components/Admin/Admin";
import Cart from "../../components/Cart/Cart";

function MainPage() {
  const { getLoggedIn, loggedIn, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    getLoggedIn();
  }, [loggedIn]);

  return (
    <div className={MainStyles.MainPage}>
      <Header loggedIn={loggedIn} getLoggedIn={getLoggedIn} isAdmin={isAdmin} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/menus" element={<Menus />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/logout" element={<Home />} />
        <Route exact path="/admin/*" element={<Admin />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default MainPage;
