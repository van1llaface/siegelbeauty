import AppStyles from './App.module.css';
import MainPage from './pages/MainPage/MainPage';
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className={AppStyles.background}>
      <MainPage />
    </div>
  );
}

export default App;
