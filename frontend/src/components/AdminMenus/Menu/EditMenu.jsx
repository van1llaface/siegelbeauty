import AdminStyles from "./AdminMenus.module.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PositionedSnackbar from "../../Cart/Snackbar";

function EditMenu() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [input, setInput] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [submitMessage, setSubmitMessage] = useState("");

  const patchMenuURL = "http://localhost:3000/menus/";

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(patchMenuURL + id, { menuName: input });
      setSubmitMessage("Successfully edited a menu");
      setTimeout(() => {
        setSubmitMessage("");
        navigate("/admin/menus");
      }, 2000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className={AdminStyles.editMenu}>
      <div>Edit category name</div>
      <form>
        <TextField
          id="outlined-basic"
          label="Name of Category"
          variant="outlined"
          onChange={handleChange}
        />
        <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
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

export default EditMenu;
