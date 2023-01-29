import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Link, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [governance, setGovernance] = useState(null);
  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenMenu(open);
  };

  const handleGovernanceMenuClick = (event) => {
    setGovernance(event.currentTarget);
  };

  const handleGovernanceMenuClose = () => {
    setGovernance(null);
  };

  const HiddenMenu = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              router.push('/projects');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Projects</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              router.push('/buidlers');
            }}
          >
            <Typography sx={{ cursor: 'pointer' }}>Buidlers</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <Link
            href={`https://forum.lxdao.io/c/governance/10`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <ListItemButton>
              <Typography sx={{ cursor: 'pointer' }}>Weekly</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            href={`https://forum.lxdao.io/c/governance/monthly-ama/12`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            <ListItemButton>
              <Typography sx={{ cursor: 'pointer' }}>AMA</Typography>
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height={{ md: '128px', sm: '120px', xs: '120px' }}
      maxWidth="1216px"
      marginX={{ lg: 'auto', md: '20px', xs: '20px' }}
      bgcolor="black"
    ></Box>
  );
};

export default Header;
