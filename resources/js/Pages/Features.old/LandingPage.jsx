import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Divider,
  Container,
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MailIcon from "@mui/icons-material/Mail";
import ChatIcon from "@mui/icons-material/Chat";

const drawerWidth = 240;

// Shared theme
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#f4f6f8",
      paper: "#fff",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Roboto, Arial",
    fontWeightBold: 700,
  },
});

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap>
          CareerID
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Analisis CV" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Analisis Kontrak" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Generator Surat" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Konsultasi AI" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: "background.paper",
            color: "text.primary",
            boxShadow: 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="sidebar"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            bgcolor: "grey.100",
            minHeight: "100vh",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom fontWeight={600}>
              Selamat Datang di CareerID Dashboard
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
                  <DescriptionIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" mt={1}>
                    Analisis CV
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cek dan tingkatkan CV kamu secara otomatis.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
                  <AssignmentIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" mt={1}>
                    Analisis Kontrak
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Analisa kontrak kerja dengan AI.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
                  <MailIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" mt={1}>
                    Generator Surat
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Buat surat lamaran kerja otomatis.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
                  <ChatIcon color="info" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" mt={1}>
                    Konsultasi AI
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Konsultasi karier dengan asisten AI.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
