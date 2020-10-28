import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 16px',
  },
  review: {
    display: 'flex',
    marginBottom: '16px',
  },
  reviewContent: {
    marginLeft: '8px',
  },
  avatar: {
    backgroundColor: '#e91e63',
  },
  commenter: {
    fontWeight: 'bold',
    marginRight: '4px',
  },
  commenterDetails: {
    display: 'flex',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 16,
  },
  reply: {
    borderLeft: '3px solid #ebebeb',
    padding: '4px 0 4px 8px',
    marginLeft: 4,
  },
  restaurant: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leaveBtn: {
    height: '24px',
    borderRadius: '20px',
  },
}));

export default useStyles;
