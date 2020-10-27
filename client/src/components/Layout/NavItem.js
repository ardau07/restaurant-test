import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Button, ListItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: 'auto',
    fontWeight: 600,
  },
  active: {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(0, 150, 199, 0.2)',
    borderRadius: 6,
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const NavItem = ({ className, href, icon: Icon, title, ...rest }) => {
  const classes = useStyles();

  return (
    <ListItem className={clsx(classes.item, className)} disableGutters {...rest}>
      {href ? (
        <Button
          activeClassName={classes.active}
          className={classes.button}
          component={RouterLink}
          to={href}
        >
          {Icon && <Icon className={classes.icon} fontSize="small" />}
          <span className={classes.title}>{title}</span>
        </Button>
      ) : (
        <Button className={classes.button}>
          {Icon && <Icon className={classes.icon} fontSize="small" />}
          <span className={classes.title}>{title}</span>
        </Button>
      )}
    </ListItem>
  );
};

export default NavItem;
