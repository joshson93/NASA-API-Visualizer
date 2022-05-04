import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import uuid from 'react-uuid';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Navbar = ({ favNum, favorites }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const resetFavNum = () => {
    localStorage.setItem('favCounter', 0);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = [
    <StyledLink to='/'>Main Page</StyledLink>,
    <StyledLink to='/APOD'>NASA's picture of the day</StyledLink>,
    <StyledLink to='/satellites'>Satellite location approximation</StyledLink>,
    <Badge
      onClick={resetFavNum}
      sx={{ color: 'pink', marginRight: '1.3em', width: '25px' }}
      //need to use length of array of photos in mongoDB to persist favNum
      badgeContent={favNum < 0 ? 0 : favNum}
      color='secondary'>
      <StyledLink to='/saved' style={{ color: 'pink' }}>
        <FavoriteIcon size='large' />
      </StyledLink>
    </Badge>,
  ];

  return (
    <AppBar position='fixed' color='inherit'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <StyledLink to='/'>Main Page</StyledLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='small'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {pages.map((page) => (
                <MenuItem key={uuid()} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{ justifyContent: 'flex-end', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.slice(1).map((page) => (
              <Button
                key={uuid()}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
