import {
  Box as MuiBox,
  Grid as MuiGrid,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  ListSubheader as MuiListSubheader,
  Drawer as MuiDrawer,
  makeStyles,
  Typography as MuiTypography,
} from '@material-ui/core';
import {
  LocalLibrary as LocalLibraryIcon,
  Search as BrowseCatalogIcon,
  PersonAdd as NewMemberIcon,
  ExposurePlus1 as NewLoanIcon,
  ExposureNeg1 as ReturnLoanIcon,
  VpnKey as LoginIcon,
} from '@material-ui/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { useDecodedJWT } from '../hooks/useDecodedJWT';

const ROUTE_MAP = [
  {
    items: [
      {
        href: '/catalog/browse',
        icon: <BrowseCatalogIcon />,
        title: 'Browse catalog',
      },
    ],
    title: 'Catalog',
  },
  {
    items: [
      {
        href: '/staff/login',
        icon: <LoginIcon />,
        requiresRole: false,
        title: 'Login',
      },
      {
        href: '/staff/loans/new',
        icon: <NewLoanIcon />,
        requiresRole: '',
        title: 'New loan',
      },
      {
        href: '/staff/loans/return',
        icon: <ReturnLoanIcon />,
        title: 'Return loan',
      },
      {
        href: '/staff/members/new',
        icon: <NewMemberIcon />,
        title: 'New member',
      },
    ],
    title: 'Staff',
  },
];

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 256,
  },
}));

const Layout = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { ssn } = useDecodedJWT();

  return (
    <>
      <MuiDrawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant='permanent'
      >
        <MuiGrid component={MuiBox} container direction='column' height='100%'>
          <MuiGrid item>
            <MuiBox paddingTop={1} textAlign='center'>
              <LocalLibraryIcon fontSize='large' />
            </MuiBox>
          </MuiGrid>
          <MuiGrid item>
            <MuiBox flexGrow={1}>
              {ROUTE_MAP.map(({ items, title }) => (
                <MuiList
                  disablePadding
                  key={title}
                  subheader={<MuiListSubheader>{title}</MuiListSubheader>}
                >
                  {items.map(({ href, icon, title }) => (
                    <MuiListItem
                      button
                      component={Link}
                      key={title}
                      selected={pathname === href}
                      to={href}
                    >
                      <MuiListItemIcon>{icon}</MuiListItemIcon>
                      <MuiListItemText>{title}</MuiListItemText>
                    </MuiListItem>
                  ))}
                </MuiList>
              ))}
            </MuiBox>
          </MuiGrid>
        </MuiGrid>

        {ssn && (
          <MuiGrid component={MuiBox} item textAlign='center'>
            <MuiTypography
              color='textSecondary'
              display='inline'
              variant='caption'
            >
              Signed as:{' '}
            </MuiTypography>
            <MuiTypography display='inline' variant='body2'>
              {ssn}
            </MuiTypography>
          </MuiGrid>
        )}
      </MuiDrawer>

      <MuiBox paddingLeft={32}>
        <Outlet />
      </MuiBox>
    </>
  );
};

export { Layout };
