import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  LoginPage,
  Profile,
  GitHubSignup,
  LandingPage,
  RepoAnalyzer
} from './Pages/index.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/github-signup" element={<GitHubSignup />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/repo-info/:owner/:repo" element={<RepoAnalyzer />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
