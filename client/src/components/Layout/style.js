import { makeStyles } from '@material-ui/styles';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  logo: {
    fontWeight: 'bold',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#FFFFFF',
  },
  content: {
    height: '100vh',
    flexGrow: 1,
    padding: '104px 72px 72px',
  },
}));

export default useStyles;
