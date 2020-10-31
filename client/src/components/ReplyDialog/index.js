import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';

import { updateReview } from 'src/store/actions/review';

import validationSchema from './schema';
import useStyles from './style';

function ReplyDialog({ open, restaurantId, reviewId, onClose, fetch }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const snackbar = useSnackbar();

  const handleSubmit = async (values) => {
    await dispatch(
      updateReview(
        restaurantId,
        reviewId,
        values,
        () => {
          onClose();
          fetch();
          snackbar.enqueueSnackbar('Add reply successfully', { variant: 'success' });
        },
        () => {
          onClose();
          snackbar.enqueueSnackbar('Add reply failed', { variant: 'error' });
        }
      )
    );
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} aria-labelledby="reply-dialog">
        <Formik
          initialValues={{
            reply: '',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <form className={classes.root} onSubmit={handleSubmit}>
              <DialogTitle disableTypography>
                <Typography variant="h6">ADD REPLY</Typography>
              </DialogTitle>
              <DialogContent>
                <TextField
                  error={Boolean(touched.reply && errors.reply)}
                  fullWidth
                  helperText={touched.reply && errors.reply}
                  label="Your reply"
                  margin="normal"
                  name="reply"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.reply}
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>CANCEL</Button>
                <Button type="submit" variant="contained" color="primary" disableElevation>
                  REPLY
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default ReplyDialog;
