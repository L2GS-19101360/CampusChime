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

cd campuschime

npm install

npm run dev

#Make sure to regularly update your branch to keep it in sync with the main branch:
git pull origin main

#If you are working on backend functionality, you can access your PHP files using the following URL:
http://localhost/campuschime/PHP_files/(your PHP file)

