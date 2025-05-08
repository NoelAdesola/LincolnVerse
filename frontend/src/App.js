// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import appTheme from "./theme";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MediaDetail from "./pages/MediaDetail";
import Account from "./pages/Account";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

const App = () => {
  const [user, setUser] = React.useState(null);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar user={user} setUser={setUser} />

          <Container component="main" sx={{ flex: 1, py: 4 }}>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/media/:type/:id" element={<MediaDetail user={user} />} />
              <Route path="/account" element={<Account user={user} setUser={setUser} />} />
              <Route path="/history" element={<History user={user} />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>

          <Box
            component="footer"
            sx={{ py: 3, bgcolor: 'black', color: 'primary.main', textAlign: 'center' }}
          >
            © {new Date().getFullYear()} LincolnVerse • Noel Adesola • 2025
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
