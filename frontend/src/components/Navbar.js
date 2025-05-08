// src/components/Navbar.js
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Navbar = ({ user, setUser }) => {
  const theme    = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorElNav,  setAnchorElNav]  = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu   = e => setAnchorElNav(e.currentTarget);
  const handleCloseNavMenu  = () => setAnchorElNav(null);
  const handleOpenUserMenu  = e => setAnchorElUser(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    setUser(null);
    handleCloseUserMenu();
    navigate('/');
  };

  // main nav links
  const navLinks = [
    { to: '/',       label: 'Home'    },
    { to: '/about',  label: 'About'   },
    { to: '/contact',label: 'Contact' },

  ];

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo - Desktop */}
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.02rem',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #009688 0%, #004D40 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '&:hover': { opacity: 0.8 }
            }}
          >
            LincolnVerse
          </Typography>

          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top',    horizontal: 'left' }}
            >
              {navLinks.map(link => (
                <MenuItem
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{link.label}</Typography>
                </MenuItem>
              ))}
              {user && (
                <>
                  <MenuItem component={RouterLink} to="/history" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">History</Typography>
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/account" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              fontWeight: 700,
              letterSpacing: '.02rem',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #009688 0%, #004D40 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            LincolnVerse
          </Typography>

          {/* Desktop menu links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map(link => (
              <Button
                key={link.to}
                component={RouterLink}
                to={link.to}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'text.primary', mx: 1 }}
              >
                {link.label}
              </Button>
            ))}
            {user && (
              <>
                <Button
                  component={RouterLink}
                  to="/history"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'text.primary', mx: 1 }}
                >
                  History
                </Button>
                <Button
                  component={RouterLink}
                  to="/account"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'text.primary', mx: 1 }}
                >
                  Account
                </Button>
              </>
            )}
          </Box>

          {/* Search icon */}
          <IconButton
            size="large"
            aria-label="search"
            color="inherit"
            onClick={() => navigate('/')}
          >
            <SearchIcon />
          </IconButton>

          {/* User avatar & menu */}
          <Box sx={{ ml: 2 }}>
            {user ? (
              <>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.username}
                      src={user.avatar}
                      sx={{ bgcolor: 'primary.main', border: '2px solid white' }}
                    >
                      {user.username[0].toUpperCase() || <AccountCircleIcon />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: 'top',    horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  sx={{ mt: '45px' }}
                >
                  <MenuItem component={RouterLink} to="/account" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                  {user.isAdmin && (
                    <MenuItem component={RouterLink} to="/admin" onClick={handleCloseUserMenu}>
                      <DashboardIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography textAlign="center">Admin</Typography>
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{
                    mx: 1,
                    color: 'text.primary',
                    '&:hover': { backgroundColor: 'rgba(0,149,136,0.08)' }
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  sx={{
                    mx: 1,
                    backgroundColor: '#009688',
                    '&:hover': { backgroundColor: '#00796B' }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
