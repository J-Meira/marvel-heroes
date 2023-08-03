import { MouseEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import {
  Button,
  DarkSwitch,
  Header as JMHeader,
  ListMenu,
  ListMenuProps,
} from '@j-meira/mui-theme';

const initialMenu: ListMenuProps = {
  open: false,
  anchorEl: null,
  list: [],
};

const pages = [
  {
    label: 'About',
    link: '/about',
  },
  {
    label: 'With Context',
    link: '/context',
  },
  {
    label: 'With Redux',
    link: '/redux',
  },
  {
    label: 'Infinite Scroll',
    link: '/infinite-scroll',
  },
];

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuMobile, setMenuMobile] = useState<ListMenuProps>(initialMenu);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuMobile({
      open: true,
      list: pages.map((p) => ({
        label: p.label,
        action: () => navigate(p.link),
      })),
      anchorEl: event.currentTarget,
    });
  };

  const isSelected = (route: string): boolean => {
    const pathname = location.pathname;
    const paths: string[] = pathname.split('/').filter((p) => p !== '');

    switch (paths.length) {
      case 1:
        return route === pathname;
      case 2:
        return route === '/' + paths[0];
      default:
        return false;
    }
  };

  return (
    <>
      <JMHeader
        navigation={
          <>
            <Typography
              variant='caption'
              className='logo'
              onClick={() => navigate('/')}
              component='h1'
            >
              M-Heros
            </Typography>
            <Box className='menu'>
              {pages.map((p) => (
                <Button
                  key={p.link}
                  className={
                    isSelected(p.link) ? 'menu-selected' : undefined
                  }
                  variant='outlined'
                  fullWidth={false}
                  onClick={() => navigate(p.link)}
                >
                  {p.label}
                </Button>
              ))}
            </Box>
            <Button
              className='menu-mobile'
              model='icon'
              size='large'
              aria-label='app menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={openMenu}
            >
              <MenuIcon />
            </Button>
          </>
        }
        actions={<DarkSwitch />}
      />
      <ListMenu
        menu={menuMobile}
        toggle={() => setMenuMobile(initialMenu)}
        navigate={(destiny) => navigate(destiny)}
      />
    </>
  );
};
