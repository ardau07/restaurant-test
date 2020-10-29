import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import useStyles from './style';

function RestaurantPanel({ restaurant }) {
  const classes = useStyles();

  return (
    <div className={classes.restaurant}>
      <Typography variant="h6">{restaurant.name}</Typography>
      <Rating className={classes.rating} value={restaurant.avgRating} precision={0.1} readOnly />
      <Typography variant="subtitle2">
        {`${restaurant.avgRating} of ${restaurant.numberOfReviews} reviews`}
      </Typography>
      <Box flexGrow={1} />
      <Link className={classes.viewDetails} to={`/reviews/${restaurant.id}`}>
        View Details
      </Link>
    </div>
  );
}

export default RestaurantPanel;
