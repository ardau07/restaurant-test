import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Drawer, List, Typography } from '@material-ui/core';
import {
  BarChart as HomeIcon,
  Restaurant as RestaurantIcon,
  ExitToApp as LogoutIcon,
  PeopleAlt as UserIcon,
} from '@material-ui/icons';

import NavItem from './NavItem';
import { logout } from 'src/store/actions/auth';

import useStyles from './style';
import ROLES from 'src/constants/roles';

const items = [
  {
    href: '/home',
    title: 'Home',
    icon: HomeIcon,
  },
  {
    href: '/restaurants',
    title: 'Restaurants',
    icon: RestaurantIcon,
  },
];

function Layout({ children }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const content = (
    <Box height="100%" bgcolor="#fff">
      <Box p={2}>
        <Typography variant="h4" color="primary">
          Restaurant
        </Typography>
        <Typography variant="overline" color="secondary">
          1.0.0
        </Typography>
      </Box>
      <Box display="flex" height="calc(100vh - 104px)" flexDirection="column" p={2}>
        <List>
          {items.map((item) => (
            <NavItem key={item.title} title={item.title} href={item.href} icon={item.icon} />
          ))}
          {profile.role === ROLES.ADMIN && <NavItem title="Users" href="/users" icon={UserIcon} />}
        </List>
        <Box flexGrow={1} />
        <NavItem title="Log Out" icon={LogoutIcon} onClick={handleLogout} />
      </Box>
    </Box>
  );

  return (
    <Box display="flex">
      <nav className={classes.drawer}>
        <Drawer classes={{ paper: classes.drawerPaper }} variant="persistent" anchor="left" open>
          {content}
        </Drawer>
      </nav>
      <Box component="main" className={classes.content}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
