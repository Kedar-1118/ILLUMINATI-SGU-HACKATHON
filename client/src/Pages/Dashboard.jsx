import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import ChatbotPopup from '../components/ChatbotPopup';
import ContributionChart from '../components/ContributionCharts';


const Dashboard = () => {
  const [selectedTech, setSelectedTech] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const username = 'jogruber';

  const technologies = [
    'React', 'Python', 'Node.js', 'TypeScript',
    'AI/ML', 'Rust', 'Go', 'GraphQL', 'Django', 'Vue'
  ];

  const projects = [
    {
      id: 1,
      title: "AI Documentation Assistant",
      problemStatement: "Automated documentation generation for better OSS maintainability",
      description: "GPT-4 powered documentation generator for open source projects",
      tech: ['AI/ML', 'Python', 'TypeScript'],
      stars: 1428,
      difficulty: 'Intermediate',
      lastUpdated: '2 days ago',
      repoUrl: "#",
      issues: 12,
      contributors: 28
    },
    {
      id: 2,
      title: "React Component Library",
      problemStatement: "Standardizing UI components across open source projects",
      description: "Accessible UI components with TypeScript support",
      tech: ['React', 'TypeScript'],
      stars: 892,
      difficulty: 'Beginner',
      lastUpdated: '1 week ago',
      repoUrl: "#",
      issues: 5,
      contributors: 15
    },
    {
      id: 3,
      title: "Database Optimization Tool",
      problemStatement: "Improving performance of legacy database systems",
      description: "Performance analyzer for PostgreSQL databases",
      tech: ['Python', 'Go', 'Rust'],
      stars: 567,
      difficulty: 'Advanced',
      lastUpdated: '3 days ago',
      repoUrl: "#",
      issues: 8,
      contributors: 12
    },
    {
      id: 4,
      title: "Real-Time Chat Application",
      problemStatement: "Secure communication for developer communities",
      description: "WebSocket-based chat with E2E encryption",
      tech: ['Node.js', 'React', 'TypeScript'],
      stars: 329,
      difficulty: 'Intermediate',
      lastUpdated: '5 days ago',
      repoUrl: "#",
      issues: 3,
      contributors: 9
    },
    {
      id: 5,
      title: "E-commerce Platform",
      problemStatement: "Open source alternative to proprietary commerce solutions",
      description: "Headless commerce solution with Django backend",
      tech: ['Django', 'Python', 'GraphQL'],
      stars: 784,
      difficulty: 'Advanced',
      lastUpdated: '1 day ago',
      repoUrl: "#",
      issues: 15,
      contributors: 23
    },
    {
      id: 6,
      title: "Data Visualization Toolkit",
      problemStatement: "Making complex data accessible through visualization",
      description: "Interactive charts and dashboards builder",
      tech: ['React', 'TypeScript', 'D3.js'],
      stars: 1203,
      difficulty: 'Intermediate',
      lastUpdated: '4 hours ago',
      repoUrl: "#",
      issues: 7,
      contributors: 18
    },
    {
      id: 7,
      title: "ML Model Deployment",
      problemStatement: "Simplifying production deployment of machine learning models",
      description: "Kubernetes-based deployment pipeline for ML models",
      tech: ['Python', 'AI/ML', 'Go'],
      stars: 458,
      difficulty: 'Advanced',
      lastUpdated: '6 days ago',
      repoUrl: "#",
      issues: 11,
      contributors: 14
    },
    {
      id: 8,
      title: "GraphQL API Boilerplate",
      problemStatement: "Accelerating GraphQL API development",
      description: "Production-ready GraphQL server template",
      tech: ['Node.js', 'GraphQL', 'TypeScript'],
      stars: 932,
      difficulty: 'Intermediate',
      lastUpdated: '2 weeks ago',
      repoUrl: "#",
      issues: 2,
      contributors: 7
    },
    {
      id: 9,
      title: "UI Testing Framework",
      problemStatement: "Ensuring visual consistency across UI updates",
      description: "Visual regression testing for component libraries",
      tech: ['Vue', 'TypeScript', 'Node.js'],
      stars: 672,
      difficulty: 'Intermediate',
      lastUpdated: '3 days ago',
      repoUrl: "#",
      issues: 6,
      contributors: 11
    }
  ];

  
