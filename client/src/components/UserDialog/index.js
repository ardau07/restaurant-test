import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Formik } from 'formik';

import validationSchema from './schema';
import { updateUser } from 'src/store/actions/user';

const ROLES = [
  { label: 'Regular User', value: 'regular user' },
  { label: 'Restaurant Owner', value: 'owner' },
];

const UserDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const snackbar = useSnackbar();

  const handleSubmit = (values) => {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      role: values.role,
    };
    if (values.password) {
      data.password = values.password;
    }

    dispatch(
      updateUser(
        user.id,
        data,
        () => {
          onClose();
          snackbar.enqueueSnackbar('Update a user successfully', { variant: 'success' });
        },
        () => {
          onClose();
          snackbar.enqueueSnackbar('Update a user failed', { variant: 'error' });
        }
      )
    );
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="user-dialog" open={open}>
      <Formik
        initialValues={{
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          role: user.role || '',
          password: '',
          confirmPassword: '',
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle disableTypography>
              <Typography variant="h4">UPDATE A USER</Typography>
            </DialogTitle>
            <DialogContent>
              <Box display="flex" justifyContent="space-between">
                <Box width="48%">
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label="First name"
                    margin="normal"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    variant="outlined"
                  />
                </Box>
                <Box width="48%">
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label="Last name"
                    margin="normal"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    variant="outlined"
                  />
                </Box>
              </Box>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.role && errors.role)}
                fullWidth
                helperText={touched.role && errors.role}
                label="User Role"
                margin="normal"
                name="role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                variant="outlined"
                select
                SelectProps={{ native: true }}
              >
                {ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </TextField>
              <Box display="flex" justifyContent="space-between">
                <Box width="48%">
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                </Box>
                <Box width="48%">
                  <TextField
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    fullWidth
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    label="Confirm Password"
                    margin="normal"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.confirmPassword}
                    variant="outlined"
                  />
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>CANCEL</Button>
              <Button type="submit" variant="contained" color="primary">
                UPDATE
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UserDialog;
