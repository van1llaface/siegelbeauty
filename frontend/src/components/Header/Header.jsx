import HeaderStyles from './Header.module.css';
import { FoodLogo } from './FoodImage';
import { Link } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';

function Header({ loggedIn, getLoggedIn, isAdmin }) {
  return (
    <div className={HeaderStyles.header}>
      <ResponsiveAppBar loggedIn={loggedIn} getLoggedIn={getLoggedIn} isAdmin={isAdmin}/>
    </div>
  );
}

export default Header;
