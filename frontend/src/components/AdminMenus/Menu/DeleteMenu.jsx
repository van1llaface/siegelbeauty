import AdminStyles from './AdminMenus.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState } from 'react';
import PositionedSnackbar from '../../Cart/Snackbar';

function DeleteMenu() {
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteMenuURL = 'http://localhost:3000/menus/';

  const [error, setError] = useState(undefined);
  const [submitMessage, setSubmitMessage] = useState(undefined);

  const handleNavigate = () => {
    navigate('/admin/menus');
  };

  const handleDelete = async () => {
    try {
      await axios.delete(deleteMenuURL + id);
      setSubmitMessage('Successfully deleted a category');
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
    <div className={AdminStyles.deleteMenu}>
      <div>Are you sure about that?</div>
      <Button variant='outlined' onClick={handleDelete}>
        Yes
      </Button>
      <Button variant='outlined' onClick={handleNavigate}>
        Go back
      </Button>
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

export default DeleteMenu;
