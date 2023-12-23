# CampusChime Web App

Welcome to the CampusChime web app repository! This document will guide you through the process of setting up the project on your local environment and performing common development tasks.

## Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- XAMPP with Apache and MySQL
- Git
- npm

## Clone the Repository

1. Open a terminal or command prompt.
2. Navigate to the `htdocs` directory using the `cd` command:

```bash
cd C:\xampp\htdocs

git clone https://github.com/L2GS-19101360/CampusChime.git

cd CampusChime

# If you are working on the API, navigate to the 'api' directory
cd api

# Install dependencies
npm install

# Navigate back to the main project directory
cd ..

# Start the development server
npm run dev

# Navigate to the 'api' directory
cd api

# Start the API server
npm start

# Make sure you are in the main project directory
cd CampusChime

# Pull the latest changes from the main branch
git pull origin temp

http://localhost/CampusChime/PHP_files/(your PHP file)
