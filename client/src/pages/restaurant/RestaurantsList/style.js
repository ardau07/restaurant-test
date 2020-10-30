import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
  },
  rating: {
    marginRight: 8,
  },
  noPadding: {
    padding: 0,
  },
  filter: {
    minWidth: 200,
  },
}));

export default useStyles;
