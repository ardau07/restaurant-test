import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  IconButton,
  Paper,
  Slider,
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
import { OpenInNew as ViewIcon } from '@material-ui/icons';

import { getRestaurants } from 'src/store/actions/restaurant';
import useDebounce from 'src/hooks/useDebounce';
import { decimalFormat } from 'src/utils/number';

import useStyles from './style';

function RestaurantsList() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState([1, 5]);

  const debouncedFilter = useDebounce(filter, 500);

  const dispatch = useDispatch();
  const { restaurants, totalCount } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(
      getRestaurants(page * rowsPerPage, rowsPerPage, {
        minRating: filter[0] || 1,
        maxRating: filter[1] || 5,
      })
    );
    // eslint-disable-next-line
  }, [dispatch, page, rowsPerPage, debouncedFilter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeFilter = (event, newFilter) => {
    setFilter(newFilter);
  };

  return (
    <Paper className={classes.paper}>
      <Box display="flex" justifyContent="flex-end">
        <Box display="flex" flexDirection="column" pr={2} mt={2}>
          <Typography variant="subtitle1">Filter by rating</Typography>
          <Slider
            className={classes.filter}
            value={filter}
            onChange={handleChangeFilter}
            valueLabelDisplay="auto"
            min={1}
            max={5}
            step={0.1}
          />
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 70 }}>#</TableCell>
              <TableCell>Restaurant Name</TableCell>
              <TableCell>Restaurant Owner</TableCell>
              <TableCell>Overview</TableCell>
              <TableCell style={{ width: 70 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants &&
              restaurants.map((restaurant, index) => (
                <TableRow key={restaurant.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{restaurant.name}</TableCell>
                  <TableCell>{`${restaurant.owner.firstName} ${restaurant.owner.lastName}`}</TableCell>
                  <TableCell>
                    {restaurant.numberOfReviews === 0 ? (
                      <Typography variant="subtitle2">No reviews</Typography>
                    ) : (
                      <Box display="flex" alignItems="center">
                        <Rating
                          className={classes.rating}
                          value={restaurant.avgRating}
                          precision={0.1}
                          readOnly
                        />
                        <Typography variant="subtitle2">
                          {`${decimalFormat(restaurant.avgRating, 2)} of ${
                            restaurant.numberOfReviews
                          } reviews`}
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell className={classes.noPadding}>
                    <IconButton
                      component={Link}
                      color="primary"
                      to={`/restaurants/${restaurant.id}`}
                      disabled={!restaurant.numberOfReviews}
                    >
                      <ViewIcon />
                    </IconButton>
                  </TableCell>
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

export default RestaurantsList;
