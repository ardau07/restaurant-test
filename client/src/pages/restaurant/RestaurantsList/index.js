import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRestaurants } from 'src/store/actions/restaurant';

function RestaurantsList() {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  console.log(restaurants);

  return <h2>Restaurants</h2>;
}

export default RestaurantsList;
