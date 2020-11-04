import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { createRestaurant, updateRestaurant } from 'src/store/actions/restaurant';
import { getUsers } from 'src/store/actions/user';
import ROLES from 'src/constants/roles';

import validationSchema from './schema';

function ReplyDialog({ open, restaurantId, reviewId, onClose, fetch }) {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state) => state.restaurant);
  const { users } = useSelector((state) => state.user);
  const profile = useSelector((state) => state.auth.user);

  const snackbar = useSnackbar();

  useEffect(() => {
    if (profile.role === ROLES.ADMIN) {
      dispatch(getUsers());
    }
  }, [dispatch, profile]);

  const handleSubmit = async (values) => {
    if (restaurantId === 'new') {
      await dispatch(
        createRestaurant(
          values,
          () => {
            onClose();
            fetch();
            snackbar.enqueueSnackbar('Create a new restaurant successfully', {
              variant: 'success',
            });
          },
          () => {
            onClose();
            snackbar.enqueueSnackbar('Create a new restaurant failed', { variant: 'error' });
          }
        )
      );
    } else {
      await dispatch(
        updateRestaurant(
          restaurantId,
          values,
          () => {
            onClose();
            fetch();
            snackbar.enqueueSnackbar('Update a restaurant successfully', { variant: 'success' });
          },
          () => {
            onClose();
            snackbar.enqueueSnackbar('Update a restaurant failed', { variant: 'error' });
          }
        )
      );
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} aria-labelledby="restaurant-dialog">
        <Formik
          initialValues={{
            ownerId: restaurant?.owner?.id || profile.id,
            name: restaurant?.name || '',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <form onSubmit={handleSubmit} style={{ width: 500 }}>
              <DialogTitle disableTypography>
                <Typography variant="h6">
                  {restaurantId === 'new' ? 'CREATE A NEW RESTAURANT' : 'UPDATE A RESTAURANT'}
                </Typography>
              </DialogTitle>
              <DialogContent>
                {profile.role === ROLES.ADMIN && (
                  <TextField
                    error={Boolean(touched.ownerId && errors.ownerId)}
                    fullWidth
                    helperText={touched.ownerId && errors.ownerId}
                    label="Restaurant Owner"
                    margin="normal"
                    name="ownerId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ownerId}
                    variant="outlined"
                    select
                    SelectProps={{ native: true }}
                  >
                    {users
                      .filter((user) => user.role === ROLES.OWNER)
                      .map((user) => (
                        <option key={user.id} value={user.id}>
                          {`${user.firstName} ${user.lastName}`}
                        </option>
                      ))}
                  </TextField>
                )}
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Restaurant Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>CANCEL</Button>
                <Button type="submit" variant="contained" color="primary" disableElevation>
                  {restaurantId === 'new' ? 'CREATE' : 'UPDATE'}
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
