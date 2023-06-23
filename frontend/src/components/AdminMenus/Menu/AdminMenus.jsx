import { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdminStyles from "./AdminMenus.module.css";
import { Link } from "react-router-dom";
import CustomPaginationActionsTable from "./Table";

function AdminMenus() {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(undefined);
  const [selectedMenu, setSelectedMenu] = useState("");

  const handleChange = (e) => {
    setSelectedMenu(e.target.value);
  };

  const menusURL = "http://localhost:3000/menus";

  useEffect(() => {
    try {
      axios.get(menusURL).then((res) => setMenus(res.data));
    } catch {
      setError(error.data.response.error);
    }
  });

  const menusJSX = menus.map((menu) => {
    return (
      <MenuItem key={menu.menuName} value={menu._id}>
        {menu.menuName}
      </MenuItem>
    );
  });

  return (
    <div className={AdminStyles.container}>
      <div className={AdminStyles.title}>Manage categories</div>
      <CustomPaginationActionsTable data={menus} />
      <div className={AdminStyles.links}>
        <Link to="add">Add</Link>
      </div>
    </div>
  );
}

export default AdminMenus;
