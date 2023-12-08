# Muttly

Muttly is an application that leverages Leonardo AI API and OPEN AI API to create custom breeds of dogs and corresponding data cards. Users can explore generated content, favorite creations, and interact with the AI-generated dog breeds and cards.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)
- [Example Showcase](#example-showcase)
- [Contributing](#contributing)
- [License](#license)

## Overview

Muttly introduces a unique way to visualize and create custom dog breeds using cutting-edge AI technologies. The application allows users to not only generate their own breeds but also explore what others have created, fostering an interactive and engaging community.

## Features

- **AI-Powered Breed Generation:** Utilizes Leonardo AI API to create custom dog breeds.
- **Data Card Creation:** Employing OPEN AI API, the app generates data cards for the custom breeds.
- **Exploration and Favoriting:** Users can browse through generated content and favorite unique breeds or data cards.
- **React-Express Architecture:** Built on the React-Express Shell template, ensuring efficient functionality and separation of concerns.

## Installation

### Environment Setup

1. Clone the repository.
2. Copy `env.example` to `.env` to override default environment values. Refer to the server README for specific details.
   
### Database Setup

Ensure the database is running before starting the server app. Details for the local database setup are available in the server README. Avoid container databases unless a challenge is desired.

### Starting as a Single App (for Production)

npm run build 
npm run start 

Browse to http://localhost:8080

### Starting as Individual Apps (for Development)

#### Server

cd server
npm install
npm run local 

#### Client

cd client
npm install
npm start

Browse to http://localhost:5173

## Usage

To interact with the application:

1. Access the provided URLs after starting the server or individual apps.
2. Explore the AI-generated dog breeds and data cards.
3. Favorite unique breeds or cards that catch your interest.

## API Documentation

_(If applicable, provide information about the APIs used, their endpoints, and interaction methods.)_

## Technologies Used

- Node.js 18
- React
- Express
- Leonardo AI API
- OPEN AI API

## Example Showcase

Check out this YouTube video demonstrating the capabilities of Muttly:

[![Muttly Showcase](https://raw.githubusercontent.com/BSMuse/Muttly/master/docs/screenshot-muttly-home.png)](https://www.youtube.com/watch?v=inpfeS3pJPM)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
