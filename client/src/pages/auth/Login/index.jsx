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

function Login() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" justifyContent="center" mt={-4}>
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            email: '',
            password: '',
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
                  <Typography variant="h4">Welcome</Typography>
                  <Box mt={2}>
                    <Typography variant="body1">Sign in to your account</Typography>
                  </Box>
                </Box>
                <CardContent>
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
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign In
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              <Box mt={5} textAlign="center">
                <Typography variant="body1">
                  Don't have an account ?{' '}
                  <Link component={RouterLink} to="/signup">
                    Create one here
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

export default Login;
