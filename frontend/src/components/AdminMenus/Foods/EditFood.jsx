import AdminStyles from './AdminFoods.module.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PositionedSnackbar from '../../Cart/Snackbar';

function EditFood() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [menus, setMenus] = useState([]);
  const [input, setInput] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [submitMessage, setSubmitMessage] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState('');

  const menusURL = 'http://localhost:3000/menus';
  const foodsURL = 'http://localhost:3000/foods/';

  useEffect(() => {
    try {
      axios.get(menusURL).then((res) => setMenus(res.data));
    } catch (error) {
      console.log(error);
    }
  });

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSelect = (e) => {
    setSelectedMenu(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(foodsURL + id, {
        foodName: input,
        menuName: selectedMenu,
        description: description,
        price: price,
      });
      setSubmitMessage('Successfully edited a food');
      setTimeout(() => {
        setSubmitMessage('');
        navigate('/admin/foods');
      }, 2000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  const menusJSX = menus.map((menu) => {
    return (
      <MenuItem key={menu.menuName} value={menu.menuName}>
        {menu.menuName}
      </MenuItem>
    );
  });

  return (
    <div className={AdminStyles.editFood}>
      <div>Edit food</div>
      <form>
        <TextField
          id='outlined-basic'
          label='Food'
          variant='outlined'
          onChange={handleChange}
        />
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id='demo-simple-select-autowidth-label'>Menu</InputLabel>
          <Select
            labelId='demo-simple-select-autowidth-label'
            id='demo-simple-select-autowidth'
            onChange={handleSelect}
            autoWidth
            label='Menu'
            value={selectedMenu}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {menusJSX}
          </Select>
        </FormControl>
        <TextField
          id='outlined-basic'
          label='Description'
          variant='outlined'
          onChange={handleDescriptionChange}
          value={description}
        />
        <TextField
          id='outlined-basic'
          label='Price'
          variant='outlined'
          onChange={handlePriceChange}
          value={price}
        />
        <Button variant='outlined' onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      {(error || submitMessage) && (
        <PositionedSnackbar
          open={!!error || !!submitMessage}
          message={error || submitMessage}
          onClose={() => {
            setError('');
            setSubmitMessage('');
          }}
          isError={!!error}
        />
      )}
    </div>
  );
}

export default EditFood;
