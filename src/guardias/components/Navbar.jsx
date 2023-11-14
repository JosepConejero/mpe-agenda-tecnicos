import { Link as RouterLink } from "react-router-dom";

import { LogoutOutlined } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  AppBar,
  Grid,
  IconButton,
  ImageListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuthStore } from "../../hooks";
import { Link } from "@mui/material";

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${0}px)` },
        ml: { md: `${0}px` },
        pl: { md: "10px" },
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{ mr: { xs: 0, md: 2 } }}>

          <ImageListItem>
            <img src="/assets/logo-navbar.png" alt="logo de MPE"></img>
          </ImageListItem>
        </IconButton>

        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Grid
            item
            sx={{
              mb: { xs: -1, md: 0 },
            }}
          >
            <Typography variant="h6" component="div">
              Calendario de guardias
              <Typography
                variant="span"
                sx={{ display: { xs: "none", md: "inline" } }}
              >
                &nbsp;-&nbsp;{user.shortName}
              </Typography>
            </Typography>
          </Grid>

          <Grid item>
            <Grid container alignItems="center">
              <Grid item sx={{ display: { md: "none" } }}>
                <Typography variant="span" fontSize="20px">
                  {user.shortName}
                </Typography>
              </Grid>
              {/* <Grid item sx={{ mr: { xs: -1.5, md: -1 }, border: 1 }}> */}
              <Grid item sx={{ mr: { md: -1 }, ml: { xs: 8 } }}>
                <Link component={RouterLink} color="inherit" to="/guardias">
                  <IconButton color="inherit">
                    <CalendarMonthIcon />
                  </IconButton>
                </Link>
                <Link component={RouterLink} color="inherit" to="/settings">
                  <IconButton color="inherit">
                    <SettingsIcon />
                  </IconButton>
                </Link>
                <IconButton color="error" onClick={startLogout}>
                  <LogoutOutlined />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
