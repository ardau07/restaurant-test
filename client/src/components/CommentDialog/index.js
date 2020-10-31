import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import { Rating } from '@material-ui/lab';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';

import { createReview } from 'src/store/actions/review';
import validationSchema from './schema';

function CommentDialog({ open, reviewId, onClose, fetch }) {
  const { restaurantId } = useParams();

  const [rating, setRating] = useState(1);

  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.review);
  const profile = useSelector((state) => state.auth.user);

  const snackbar = useSnackbar();

  const review = useMemo(() => {
    if (open) {
      const findReview = reviews && reviews.find((item) => item.id === reviewId);
      setRating(findReview?.rating || 1);
      return findReview;
    }
    return null;
  }, [reviews, reviewId, open]);

  const handleSubmit = async (values) => {
    if (reviewId === 'new') {
      await dispatch(
        createReview(
          restaurantId,
          values,
          () => {
            onClose();
            fetch();
            snackbar.enqueueSnackbar('Leave a comment successfully', { variant: 'success' });
          },
          () => {
            onClose();
            snackbar.enqueueSnackbar('Leave a comment failed', { variant: 'error' });
          }
        )
      );
    }
  };

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="comment-dialog" open={open}>
        <Formik
          initialValues={{
            commenterId: review?.userId || profile.id,
            rating: review?.rating || 1,
            visitDate: review?.visitDate || '',
            comment: review?.comment || '',
            reply: review?.reply || '',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle disableTypography>
                <Typography variant="h6">
                  {reviewId === 'new' ? 'LEAVE A NEW COMMENT' : 'UPDATE A COMMENT'}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Box mb={1}>
                  <Typography component="legend">How do you like this restaurant?</Typography>
                  <Box display="flex" alignItems="center" mt="4px">
                    <Rating value={1} max={1} readOnly />
                    <Rating
                      name="rating"
                      value={values.rating - 1}
                      max={4}
                      precision={0.1}
                      onChange={(event, newValue) => setFieldValue('rating', newValue + 1)}
                      onChangeActive={(event, newValue) => setRating(newValue + 1)}
                    />
                    <Typography variant="subtitle2" fontWeight="bold" style={{ marginLeft: 8 }}>
                      ({rating !== 0 ? rating : values.rating})
                    </Typography>
                  </Box>
                </Box>
                <TextField
                  error={Boolean(touched.visitDate && errors.visitDate)}
                  fullWidth
                  helperText={touched.visitDate && errors.visitDate}
                  label="Visit Date"
                  margin="normal"
                  name="visitDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="date"
                  value={values.visitDate}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  error={Boolean(touched.comment && errors.comment)}
                  fullWidth
                  helperText={touched.comment && errors.comment}
                  label="Your comment"
                  margin="normal"
                  name="comment"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.comment}
                  variant="outlined"
                  multiline
                  rows={5}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>CANCEL</Button>
                <Button type="submit" variant="contained" color="primary" disableElevation>
                  {reviewId === 'new' ? 'CREATE' : 'UPDATE'}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default CommentDialog;
