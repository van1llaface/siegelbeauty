import { useState, useEffect } from "react";
import axios from "axios";
import AdminStyles from "./AdminFoods.module.css";
import { Link, useParams } from "react-router-dom";
import CustomPaginationActionsTable from "./Table";

function AdminFoods() {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(undefined);

  const foodsURL = "http://localhost:3000/foods/";

  const { id } = useParams();

  useEffect(() => {
    try {
      axios.get(foodsURL).then((res) => setFoods(res.data));
    } catch {
      setError(error.data.response.error);
    }
  });

  return (
    <div className={AdminStyles.container}>
      <div className={AdminStyles.title}>Manage services</div>
      <CustomPaginationActionsTable foods={foods} />
      <div className={AdminStyles.links}>
        <Link to="add">Add</Link>
      </div>
    </div>
  );
}

export default AdminFoods;
