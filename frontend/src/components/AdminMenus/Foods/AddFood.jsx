import { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdminStyles from "./AdminFoods.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import PositionedSnackbar from "../../Cart/Snackbar";

function AdminFoods() {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(undefined);
  const [input, setInput] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const menusURL = "http://localhost:3000/menus";
  const foodsURL = "http://localhost:3000/foods";

  useEffect(() => {
    try {
      axios.get(menusURL).then((res) => setMenus(res.data));
    } catch (error) {
      console.log(error);
    }
  });

  const menusJSX = menus.map((menu) => {
    return (
      <MenuItem key={menu.menuName} value={menu.menuName}>
        {menu.menuName}
      </MenuItem>
    );
  });

  const handleSelect = (e) => {
    setSelectedMenu(e.target.value);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handlePriceChange = (event) => {
    const numericValue = event.target.value.replace(/[^0-9.]/g, "");
    setPrice(numericValue);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(foodsURL, {
        foodName: input,
        menuName: selectedMenu,
        description: description,
        price: price,
      });
      setSubmitMessage("Successfully added a service");
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
    <div className={AdminStyles.addFood}>
      <div className={AdminStyles.title}>Add a service</div>
      <form>
        <TextField
          id="outlined-basic"
          label="Service"
          variant="outlined"
          onChange={handleChange}
        />
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={handleSelect}
            autoWidth
            label="Category"
            value={selectedMenu}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {menusJSX}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          onChange={handleDescriptionChange}
          value={description}
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          onChange={handlePriceChange}
          value={price}
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

export default AdminFoods;
