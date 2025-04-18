﻿# ILLUMINATI-SGU-HACKATHON

 # OpenNest

**OpenNest** is a platform designed to connect developers to open-source projects and help them make meaningful contributions. By logging in through GitHub, users can receive personalized recommendations for open-source repositories based on their skills and interests. As users contribute, they earn badges and rewards, encouraging growth and participation in the open-source community.

## Features

- **GitHub Authentication**: Users can log in using their GitHub account for easy access.
- **Open Source Repository Recommendations**: Based on the user's skill set and activity, OpenNest recommends relevant open-source projects they can contribute to.
- **Contribution Tracking**: Users can track the number of contributions they've made across repositories.
- **Earn Badges**: Users receive badges based on their contribution milestones. The more contributions they make, the more badges they unlock.
- **Leaderboard**: Users can see how they stack up against others in the community, fostering a sense of healthy competition.
  
## How It Works

1. **Login with GitHub**: 
   - Users log in via GitHub to authenticate their account and retrieve data such as repositories they've contributed to, their languages and frameworks, etc.

2. **Get Recommended Repositories**: 
   - Based on their profile and activity, OpenNest provides personalized suggestions of open-source repositories to contribute to. The recommendations are tailored to match the user's skill set (e.g., programming languages, technologies, etc.).

3. **Contribute to Repositories**: 
   - Users can browse the recommended repositories and contribute to them by submitting pull requests, reporting issues, or participating in discussions. Each valid contribution earns the user points.

4. **Earn Badges**: 
   - For every set of contributions, users earn badges. For example, a user might earn a "First Contributor" badge for making their first pull request, or a "Top Contributor" badge for having the most pull requests merged in a month. These badges are visible on their profile.

5. **Track Contributions**: 
   - Users can see a history of all their contributions and how many points or badges they've earned. A profile dashboard provides an overview of their open-source journey.

6. **Community Interaction**: 
   - Users can interact with others, exchange tips, and even collaborate on large open-source projects within the community.

## Badges

Badges are awarded based on the number and quality of contributions a user makes. Some examples of badges include:

- **First Contribution**: Given when a user makes their first pull request.
- **Contributor**: Awarded after a certain number of accepted pull requests.
- **Top Contributor**: Given to users who have made significant contributions over time.
- **Maintainer**: For users who have taken on the role of maintaining or managing a repository.
- **Issue Reporter**: For users who actively report bugs and issues on repositories.

## Technologies Used

- **Frontend**: 
  - React.js for building the user interface.
  - Tailwind CSS for styling and layout.
  
- **Backend**: 
  - Node.js (Express) for the server-side logic and API handling.
  - GitHub API for authentication and fetching repository data.

- **Database**: 
  - MongoDB for storing user data, badges, and contribution history.

- **Authentication**:
  - GitHub OAuth for logging in securely using GitHub accounts.

- **Charts & Data Visualization**:
  - React Chart.js for displaying contribution statistics and leaderboards.

## Installation

### Prerequisites

- Node.js installed
- GitHub Developer account (for OAuth)
- MongoDB (or a cloud database service like MongoDB Atlas)
