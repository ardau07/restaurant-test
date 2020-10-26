import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';

import validationSchema from './schema';

const ROLES = [
  { label: '', value: '' },
  { label: 'Regular User', value: 'regular user' },
  { label: 'Restaurant Owner', value: 'owner' },
];

function Signup() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" justifyContent="center" mt={-4}>
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <Box display="flex" flexDirection="column" alignItems="center" mt={2} mb={-2}>
                  <Typography variant="h4">Create Account</Typography>
                  <Box mt={2}>
                    <Typography variant="body1">Let's build amazing products</Typography>
                  </Box>
                </Box>
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
                  <TextField
                    error={Boolean(touched.role && errors.role)}
                    fullWidth
                    helperText={touched.role && errors.role}
                    label="Role"
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
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Create Account
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              <Box mt={5} textAlign="center">
                <Typography variant="body1">
                  Already have an account ?{' '}
                  <Link component={RouterLink} to="/login">
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Signup;
