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
export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuMobile, setMenuMobile] = useState<ListMenuProps>(initialMenu);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuMobile({
      open: true,
      list: [
        {
          label: 'With Context',
          action: () => navigate('/context'),
        },
        {
          label: 'With Redux',
          action: () => navigate('/redux'),
        },
      ],
      anchorEl: event.currentTarget,
    });
  };

  const isSelected = (route: string) => location.pathname === route;

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
              <Button
                className={
                  isSelected('/context') ? 'menu-selected' : undefined
                }
                variant='outlined'
                fullWidth={false}
                onClick={() => navigate('/context')}
              >
                With Context
              </Button>
              <Button
                className={
                  isSelected('/redux') ? 'menu-selected' : undefined
                }
                variant='outlined'
                fullWidth={false}
                onClick={() => navigate('/redux')}
              >
                With Redux
              </Button>
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
