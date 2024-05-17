"use client";

import { ModeSwitchButton } from "@/components/Button/ModeSwitch";
import { navLinks } from "@/constants";
import { LogoIcon } from "@/Icons/LogoIcon";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import Link from "next/link";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { MenuIcon } from "lucide-react";

export default function Navbar() {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  const obj = { PRIMARY_LIGHT, PRIMARY_MAIN, PRIMARY_DARK };

  const NavLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  }));

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ top: 0 }}
      className=" border-white border-opacity-40 !bg-white bg-opacity-80 shadow-lg !shadow-black/[0.03] backdrop-blur-[0.5rem] dark:!bg-gray-950 dark:border-black/40 dark:!bg-opacity-90"
    >
      <Toolbar disableGutters>
        <Box
          className="!bg-transparent"
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "background.default",
            // color: 'text.primary',
            borderRadius: 1,
            p: 3,
          }}
        >
          <Box sx={{ width: 40, height: 40 }}>
            <Link href="/">
              <LogoIcon {...obj} />
            </Link>
          </Box>

          {/* desktop navbar */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
            className="flex gap-x-5"
          >
            {navLinks.map((navLink) => (
              <NavLink
                href={navLink.path}
                key={navLink.title}
                className={
                  navLink.title !== "home"
                    ? "code-effect text-glow lowercase text-purple-300 font-medium hover:!text-purple-100"
                    : "react-effect text-glow lowercase text-purple-300 font-medium hover:!text-purple-100"
                }
              >
                {navLink.title}
              </NavLink>
            ))}

            {/* <ModeSwitchButton /> */}
          </Box>

          {/* desktop navbar */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navLinks.map((navLink) => (
                <MenuItem
                  key={navLink.title}
                  onClick={handleCloseNavMenu}
                  className="!py-0"
                >
                  <NavLink
                    href={navLink.path}
                    key={navLink.title}
                    className={
                      navLink.title !== "home"
                        ? "code-effect text-glow lowercase text-purple-300 font-medium hover:!text-purple-100"
                        : "react-effect text-glow lowercase text-purple-300 font-medium hover:!text-purple-100"
                    }
                  >
                    {navLink.title}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
