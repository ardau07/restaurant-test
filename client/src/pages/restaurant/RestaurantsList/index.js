import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import RestaurantPanel from '../RestaurantPanel';
import { getRestaurants } from 'src/store/actions/restaurant';

function RestaurantsList() {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const handleLeaveComment = (restaurantId) => (event) => {
    event.stopPropagation();
    console.log(restaurantId);
  };

  return (
    <Container maxWidth="md">
      {restaurants &&
        restaurants.map((restaurant) => (
          <RestaurantPanel restaurant={restaurant} onLeaveComment={handleLeaveComment} />
        ))}
    </Container>
  );
}

export default RestaurantsList;
