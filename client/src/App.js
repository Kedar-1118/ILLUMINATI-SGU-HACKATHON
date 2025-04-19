import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  LoginPage,
  Profile,
  About,
  GitHubSignup,
  LandingPage,
  RepoAnalyzer
} from './Pages/index.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/github-signup" element={<GitHubSignup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/repo-info/:owner/:repo" element={<RepoAnalyzer />} />
      </Routes>
    </Router>
  );
};

export default App;
