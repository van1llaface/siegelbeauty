import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function PositionedSnackbar({ open, message, onClose, isError }) {
  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity={isError ? 'error' : 'success'} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
