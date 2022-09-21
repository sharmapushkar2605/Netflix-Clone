import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux'
import { closeNotification} from '../store/NotificationSlice';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Notification() {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeNotification())
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleClose}anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }} >
          {notification.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
