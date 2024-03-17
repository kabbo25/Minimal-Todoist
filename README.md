# Todo App

## Overview

This is a simple Todo application built using React. It allows users to create, update, and delete todo items. The app utilizes local storage to persist todo items even after the user refreshes or closes the browser.

## Features

- **Add Todo:** Users can add a new todo item with a title, description, and tag (e.g., work, study, self, other).
- **Update Todo:** Users can edit the title, description, and tag of existing todo items.
- **Delete Todo:** Users can remove todo items from the list.
- **Filter by Tag:** Users can filter todo items based on their tags.
- **Pagination:** Todo items are paginated, with four items displayed per page.
- **Responsive Design:** The app is designed to work seamlessly on various screen sizes, from desktop to mobile devices.

## Local Storage Usage

The app utilizes local storage to store todo items locally on the user's device. Here's how it works:

- **Initialization:** When the app is loaded, it checks if there are any todo items stored in the local storage.
- **Storage Format:** Todo items are stored as JSON objects in the local storage.
- **Persistence:** Whenever a new todo item is added, updated, or deleted, the app updates the local storage accordingly.
- **Retrieval:** On subsequent visits to the app, it retrieves the stored todo items from the local storage and displays them to the user.

## Installation and Setup

To run the Todo app locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies using `npm install` or `yarn install`.
4. Start the development server using `npm start` or `yarn start`.
5. Open your browser and visit `http://localhost:3000` to view the app.

## Technologies Used

The Todo app is built using the following technologies:

- **React:** JavaScript library for building user interfaces.
- **React Bootstrap:** Front-end framework for building responsive and mobile-first websites.
- **Font Awesome:** Icon library for adding scalable vector icons to the app.
- **React Router:** Library for adding routing functionality to the React app.


