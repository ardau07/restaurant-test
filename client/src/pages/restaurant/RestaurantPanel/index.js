import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import useStyles from './style';

function RestaurantPanel({ restaurant, onLeaveComment }) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion expanded={expanded} onChange={toggleExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="restaurant-panel">
        <div className={classes.restaurant}>
          <Typography variant="h6">{restaurant.name}</Typography>
          {expanded && (
            <Button
              className={classes.leaveBtn}
              variant="contained"
              size="small"
              disableElevation
              onClick={onLeaveComment(restaurant.id)}
            >
              Leave comment
            </Button>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.wrapper}>
          {restaurant.reviews.map((review) => (
            <Box key={review.id} className={classes.review}>
              <Avatar className={classes.avatar}>
                {review.commenter.firstName.slice(0, 1).toUpperCase()}
              </Avatar>
              <Box className={classes.reviewContent}>
                <Box className={classes.commenterDetails}>
                  <Typography className={classes.commenter} variant="subtitle2">
                    {`${review.commenter.firstName} ${review.commenter.lastName}`}
                  </Typography>
                  <Typography variant="subtitle2">
                    {` · ${review.visitDate.slice(0, 10)}`}
                  </Typography>
                  <Rating
                    className={classes.rating}
                    value={review.rating}
                    precision={0.1}
                    readOnly
                  />
                  <Typography variant="subtitle2">({review.rating})</Typography>
                </Box>
                <Box component="p" fontWeight={500} mb={1}>
                  {review.comment}
                </Box>
                {review.reply && (
                  <Typography className={classes.reply} variant="subtitle2">
                    {review.reply}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default RestaurantPanel;
