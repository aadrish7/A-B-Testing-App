# AB Testing Application

## Overview

This project is an AB Testing Application that allows administrators to select a version (A, B, or null) for a feature, while users are randomly assigned a version if none is selected by the admin. The application is built using a Node.js backend with a React frontend, and includes MongoDB for data persistence.

### Features

- **Admin Page**: Allows administrators to select a version (A, B, or null) and view analytics for users who have been assigned a version.
- **User Assignment**: Users are randomly assigned a version (A or B) if the admin has not pre-selected a version.
- **Analytics**: View the number of users assigned to each version and the number of users who have clicked a button for the first time.

### URL Routes Frontend

- **Landing Page (/)**: Displays one of two promotional messages based on the version fetched from the API:
  - Version A: `<h1>Get 50% Off Your Next Purchase!</h1>`
  - Version B: `<h1>Exclusive Offer: Buy One Get One Free!</h1>`
  
  This page retrieves the version information from an API and updates the displayed message accordingly.

- **Admin Page (/admin)**: Allows administrators to:
  - **Manually Set the Version**: Choose which version (A or B) users should see on the landing page. Buttons are provided to set version A, version B, or to unset the version (null).
  - **View Analytics**: Check how many users have clicked the button for each version. This helps in assessing the performance and effectiveness of the promotional messages.

## Project Structure

```plaintext
project-root/
│
├── AB_Testing_App/
│   ├── src/
│   │   ├── components/
│   │   │   └── AdminPage.tsx
|   |   │   └── ...
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── models/
│   │   ├── AdminVersion.js
│   │   └── User.js
│   ├── routers/
│   │   ├── adminRouter.js
│   │   ├── userRouter.js
│   │   └── analyticsRouter.js
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
└── .env
```
## Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/aadrish7/A-B-Testing-App.git
    ```

2. **Install dependencies for the frontend**:
    ```sh
    cd AB_Testing_App
    npm install
    npm install express mongoose cors dotenv
    ```

3. **Install dependencies for the backend**:
    ```sh
    cd server
    npm install
    ```

4. **Create a `.env` file** in the root of the `server` folder with the following content:
    ```
    MONGO_URI=<Your MongoDB URI>
    PORT=3001
    ```

### Running the Application

1. **Start the backend server**:
    ```sh
    cd server
    npm start
    ```

2. **Start the frontend development server**:
    ```sh
    cd AB_Testing_App
    npm run dev
    ```

## API Endpoints

### Admin Routes

- **GET `/api/admin/getAdminVersion`**: Get the current admin-selected version.
- **PATCH `/api/admin/setAdminVersion`**: Set the admin-selected version.

### User Routes

- **GET `/api/user/getVersion`**: Get the version for a user by `userId`.
- **PATCH `/api/user/updateFirstClick`**: Update the `firstClick` timestamp for a user.

### Analytics Routes

- **GET `/api/analytics/getVersionAnalytics`**: Get analytics on how many users have seen each version and how many have interacted.

