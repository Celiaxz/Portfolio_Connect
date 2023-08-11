# Portfolio Connect

![Logo](favicon-16x16.png)
Portfolio Connect is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create their portfolios, showcase coding projects, collaborate with others, and explore a diverse range of portfolios from different users. With user authentication, GitHub integration, and more, Portfolio Connect provides a comprehensive platform for developers to manage their coding journey.

## [Visit app](https://portfolio-connect.netlify.app/) :)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Client](#client)
- [Server](#server)
- [Backlog](#backlog)
- [Contributors](#contributors)

## Features

- **User Authentication:** Secure sign-up and login functionality.
- **Profile Image:** Personalize your portfolio by uploading a profile image.
- **Project Creation:** Create, manage, and showcase your coding projects.
- **My Projects:** Conveniently view a list of the projects you've created.
- **GitHub Integration:** Link your GitHub account to display your GitHub projects and explore other users' repositories.
- **Project Comments:** Receive, manage, edit, update, and delete comments on your projects.
- **Project Management:** Edit, update, and delete the projects you've created.
- **Search Projects:** Discover projects from other users via search functionality.
- **GitHub Project Links:** View GitHub users' projects and access their repositories directly.
- **Logout:** Log out securely with a single click.

## Technologies Used

- **Frontend:** Built with Vite and React. UI libraries such as Mantine and Ant Design enhance the user experience.
- **Backend:** Developed using Express.js, providing a robust foundation for handling requests and managing data.
- **Database:** MongoDB stores user information, project details, and comments.
- **Deployment:** Backend deployed on Adaptable for reliability; frontend hosted on Netlify for seamless user experience.
- Public APIs

## Client
### Routes
- / - Homepage
- /signup - Signup form
- /login - Login form
- /create-project - Create a project
- /projects/:projectId - Project detail
- /projects/:projectId/update - Update project details
- /search-projects - Browse among every project on the site
- /user/:id - User details
- /user/update - Update user details
- /user/:id/projects - All projects of a user
- /otherusers/:id - List of all users
- /github/:id - GitHub projects of a user

### Pages
- Home Page (public)
- Sign up Page (public)
- Log in Page (public)
- User Page (user only)
- Update User Page (user only)
- User Project Page (user only)
- Project Page (user only)
- Update Project Page (user only)
- Search Project Page (user only)
- Github Page (user only)

### Components
- Project From component
- Comments component
- Navbar component
- Footer component
- Pagination component

## Server
### Models

User model

```
username - String // required
email - String // required & unique
password - String // required
githubUsername - String // required
projects - [ObjectID<Project>]
comments - [ObjectID<Comment>]
skills - [String]
image - String
aboutMe- Strying
```

Project model

```
title - String // required
description - String // required
technologies - [String] // required
grepositoryLik - String
projectFolder - String
userId - ObjectID<User>
comments - [ObjectID<Comment>]
```

Comment model

```
userId - ObjectID<User>
projectId - ObjectID<Project>
comment - Sting
date - Date
```

### Backend Routes
- GET /auth/verify
- POST /auth/signup
   - body:
      - username
      - email
      - password
      - githubUsername
- POST /auth/login
   - body:
      - username
      - password
- GET /user/:id
- PUT /user/update/:id
   - body:
      - username
      - githubUsername
      - email
      - skills
      - image
      - aboutMe
- GET /user/users/all
- POST /project/create
   - body:
      - title
      - description
      - technologies
      - repositoryLink
      - projectFolder
      - userId
- GET /project/:id
- GET /project/userId/:id
- PUT /project/update/:id
   - body:
      - title
      - description
      - technologies
      - repositoryLink
      - projectFolder
      - userId
- DELETE /project/delete/:id
- GET /project/all/projects
- POST /:projectId/comment
   - body:
      - userId
      - projectId
      - comment
- GET /:projectId/comment/:commentId
- PATCH /:projectId/comment/:commentId/update
   - body:
      - comment
- DELETE /:projectId/comment/:commentId/delete
- DELETE /:projectId/comments/delete

## Backlog
- Search functionality on OtherUsers page
- Uploading repositories

### Contributors

- **farkasgz:** [Link](https://github.com/farkasgz)
- **aymiwash:** [Link](https://github.com/aymiwash)
- **Celiaxz** [Link](https://github.com/Celiaxz)

### Deploy

[Link](https://portfolio-connect.netlify.app/)
