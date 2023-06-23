import AdminStyles from "./AdminFoods.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState } from "react";
import PositionedSnackbar from "../../Cart/Snackbar";

function DeleteFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const foodsURL = "http://localhost:3000/foods/";

  const [error, setError] = useState(undefined);
  const [submitMessage, setSubmitMessage] = useState(undefined);

  const handleNavigate = () => {
    navigate("/admin/foods");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(foodsURL + id);
      setSubmitMessage("Successfully deleted a service");
      setTimeout(() => {
        setSubmitMessage("");
        navigate("/admin/foods");
      }, 2000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className={AdminStyles.deleteFood}>
      <div>Are you sure about that?</div>
      <Button variant="outlined" onClick={handleDelete}>
        Yes
      </Button>
      <Button variant="outlined" onClick={handleNavigate}>
        Go back
      </Button>
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
  );
}

export default DeleteFood;
