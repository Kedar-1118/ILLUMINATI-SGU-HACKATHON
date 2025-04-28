# <img src="client/public/OpenNestLogo1.png" width="50" height="50" alt="OpenNest Logo" style="vertical-align: middle;" /> <span style="vertical-align: middle;">OpenNest - Connect, Contribute and Grow</span>

OpenNest is a platform designed to connect developers to open-source projects and help them make meaningful contributions. By logging in through GitHub, users can receive personalized recommendations for open-source repositories based on their skills and interests. As users contribute, they earn badges and rewards, encouraging growth and participation in the open-source community.

## 🎖️ Badges

![Build](https://img.shields.io/badge/build-passing-brightgreen) &nbsp; ![License](https://img.shields.io/badge/license-MIT-blue.svg) &nbsp; ![Node.js](https://img.shields.io/badge/node.js-18.x-brightgreen) &nbsp; ![MongoDB](https://img.shields.io/badge/database-MongoDB-green) &nbsp; ![Made with Love](https://img.shields.io/badge/made%20with-%E2%9D%A4-red) &nbsp; ![React](https://img.shields.io/badge/React-17.x-61DAFB) &nbsp; ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-2.0-38B2AC)

---

## Table of Contents
- [Features](#features)
- [How It Works](#how-it-works)
- [Badges](#badges)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **GitHub Authentication**: Users can log in using their GitHub account for easy access.
- **Open Source Repository Recommendations**: Get personalized suggestions based on your profile, activity, and skills.
- **Contribution Tracking**: Track contributions and progress across repositories.
- **Earn Badges**: Unlock badges for significant contributions to open-source projects.
- **Leaderboard**: View your rank and compete with others in the community.

---

## How It Works
1. **Login with GitHub**:  
    Users log in via GitHub for seamless authentication, which retrieves repositories, languages, and framework details.

2. **Get Recommended Repositories**:  
    Based on your GitHub activity, OpenNest provides relevant open-source project recommendations that match your skills.

3. **Contribute to Repositories**:  
    You can contribute by submitting pull requests, reporting issues, or engaging in discussions. Valid contributions earn you points.

4. **Earn Badges**:  
    As you contribute, you earn badges like "First Contributor" or "Top Contributor," which appear on your profile.

5. **Track Contributions**:  
    Keep track of your contributions, points, and badges through a comprehensive dashboard.

6. **Community Interaction**:  
    Engage with other developers in the community, share tips, and collaborate on projects.

---

## Badges
Badges are awarded based on contributions. Examples include:
- **First Contribution**: Awarded for your first pull request.
- **Contributor**: Given after a certain number of merged pull requests.
- **Top Contributor**: For users with the highest number of accepted contributions over time.
- **Maintainer**: For those who manage or maintain a repository.
- **Issue Reporter**: For actively reporting issues on repositories.

---

## Technologies Used
### Frontend:
- React.js for building the user interface.
- Tailwind CSS for styling and layout.

### Backend:
- Node.js (Express) for handling the server-side logic and API requests.
- GitHub API for authentication and repository data retrieval.

### Database:
- MongoDB for storing user data, badges, and contributions.

### Authentication:
- GitHub OAuth for secure login.

### Charts & Data Visualization:
- React Chart.js for displaying contribution statistics and leaderboards.

---

## Installation
### Prerequisites
- Node.js installed
- GitHub Developer account (for OAuth)
- MongoDB or MongoDB Atlas (for database storage)

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/Kedar-1118/OpenNest.git
    ```

2. Install dependencies for both the client and server:
    - In the client folder:
      ```bash
      cd client
      npm install
      ```
    - In the server folder:
      ```bash
      cd server
      npm install
      ```

3. Set up GitHub OAuth credentials and other configurations in `github.config.js` and `googleSheets.config.js`.

4. Run the project:
    - In the client folder:
      ```bash
      npm start
      ```
    - In the server folder:
      ```bash
      npm start
      ```

---

## Contributing
We welcome contributions to OpenNest! Please follow the instructions below:
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature
    ```
3. Make your changes and commit them:
    ```bash
    git commit -am 'Add your feature'
    ```
4. Push your branch:
    ```bash
    git push origin feature/your-feature
    ```
5. Submit a pull request.

Please ensure your code adheres to our coding standards and passes tests before submitting a PR.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
