import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';

import { updateProfile, deleteProfile } from 'src/store/actions/auth';

import validationSchema from './schema';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.user);

  const snackbar = useSnackbar();
  const confirm = useConfirm();

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
      updateProfile(
        data,
        () => snackbar.enqueueSnackbar('Update an account successfully', { variant: 'success' }),
        () => snackbar.enqueueSnackbar('Update an account failed', { variant: 'error ' })
      )
    );
  };

  const handleDelete = () => {
    confirm({
      description: 'Are you going to delete your account permanently?',
    }).then(() => {
      dispatch(
        deleteProfile(
          () => snackbar.enqueueSnackbar('Delete an account successfully', { variant: 'success' }),
          () => snackbar.enqueueSnackbar('Delete an account failed', { variant: 'error ' })
        )
      );
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item lg={8} md={6} xs={12}>
          <Formik
            initialValues={{
              email: profile.email,
              firstName: profile.firstName,
              lastName: profile.lastName,
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Card>
                  <CardHeader subheader="The information can be edited" title="Profile" />
                  <Divider />
                  <CardContent>
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
                  </CardContent>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" p={2}>
                    <Button type="submit" color="primary" variant="contained" disableElevation>
                      Update Profile
                    </Button>
                  </Box>
                </Card>
              </form>
            )}
          </Formik>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Card>
            <CardHeader title="Other actions" />
            <Divider />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Once you delete your account, you cannot recover your account.
              </Typography>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="contained" onClick={handleDelete} disableElevation>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsPage;
