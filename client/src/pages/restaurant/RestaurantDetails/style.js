import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
  },
  restaurantDetails: {
    padding: '24px 32px',
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export default useStyles;
