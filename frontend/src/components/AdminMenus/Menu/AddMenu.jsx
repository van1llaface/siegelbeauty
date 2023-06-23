import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AdminStyles from './AdminMenus.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PositionedSnackbar from '../../Cart/Snackbar';

function AddMenu() {
  const postMenuURL = 'http://localhost:3000/menus';
  const [input, setInput] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(postMenuURL, { menuName: input });
      setSubmitMessage('Successfully added a new menu');
      setTimeout(() => {
        setSubmitMessage('');
        navigate('/admin/menus');
      }, 2000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };
  return (
    <div className={AdminStyles.addMenu}>
      <div className={AdminStyles.title}>Add new category</div>
      <form>
        <TextField
          id='outlined-basic'
          label='Name of Category'
          variant='outlined'
          onChange={handleChange}
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

export default AddMenu;
