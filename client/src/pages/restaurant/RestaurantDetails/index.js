import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import Loader from 'src/components/Loader';
import { getReviews } from 'src/store/actions/review';

import useStyles from './style';

function RestaurantDetails() {
  const classes = useStyles();
  const { restaurantId } = useParams();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { reviews, totalCount, highest, lowest } = useSelector((state) => state.review);
  const { restaurants } = useSelector((state) => state.restaurant);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    await dispatch(getReviews(restaurantId, page * rowsPerPage, rowsPerPage));
    setLoading(false);
  }, [dispatch, page, rowsPerPage, restaurantId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const restaurant = useMemo(() => {
    return restaurants.find((item) => item.id === +restaurantId);
  }, [restaurants, restaurantId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return loading ? (
    <Loader />
  ) : (
    <Paper className={classes.paper}>
      <Box className={classes.restaurantDetails}>
        <Typography variant="h4">{restaurant.name}</Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">Average Rating</Typography>
            <Box display="flex" alignItems="center">
              <Rating
                className={classes.rating}
                value={restaurant.avgRating}
                precision={0.1}
                readOnly
              />
              <Typography variant="subtitle2">({restaurant.avgRating})</Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">Highest Rating</Typography>
            <Box display="flex" alignItems="center">
              <Rating className={classes.rating} value={highest} precision={0.1} readOnly />
              <Typography variant="subtitle2">({highest})</Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">Lowest Rating</Typography>
            <Box display="flex" alignItems="center">
              <Rating className={classes.rating} value={lowest} precision={0.1} readOnly />
              <Typography variant="subtitle2">({lowest})</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 70 }}>#</TableCell>
              <TableCell>Commenter</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Visit Date</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Reply</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews &&
              reviews.map((review, index) => (
                <TableRow key={review.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{`${review.commenter.firstName} ${review.commenter.lastName}`}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Rating
                        className={classes.rating}
                        value={review.rating}
                        precision={0.1}
                        readOnly
                      />
                      <Typography variant="subtitle2">({review.rating})</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{review.visitDate.slice(0, 10)}</TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>{review.reply}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 225]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
}

export default RestaurantDetails;
