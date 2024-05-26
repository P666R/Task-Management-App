# Task Management Frontend

## Project Description

Task Management App frontend implements the client-side functionalities for managing tasks. It provides features to create, edit, delete, and list tasks. The application aims to be user-friendly, responsive, and secure.

## Technologies Used

- React: Chosen for its popularity, component-based architecture, and efficient rendering.
- Formik: Used for form management, validation, and easy integration with React.
- React Query: Utilized for fetching and managing data from the backend API.
- Tailwind CSS with CSS Modules: Selected for its utility-first approach, ease of use, and ability to create responsive designs.
- Yup: Used for schema validation and easy integration with React Formik.

## Design Considerations

- **User-Friendly UI**: The UI is designed to be intuitive and easy to use, with clear navigation and informative feedback.
- **Responsive Design**: The application is designed to work seamlessly on both mobile and desktop devices, adapting to different screen sizes.
- **Client-Side Validations**: Client-side validations ensure data integrity and provide instant feedback to users.
- **Error Handling**: The application handles errors gracefully, displaying meaningful error messages to users.

## Folder Structure

- 📂 **frontend**
  - 📂 **public**
  - 📂 **src**
    - 📂 **assets**
    - 📂 **components**
      - 📄 [Navbar.jsx](frontend/src/components/Navbar.jsx)
      - 📄 [TaskDetail.jsx](frontend/src/components/TaskDetail.jsx)
      - 📄 [TaskForm.jsx](frontend/src/components/TaskForm.jsx)
      - 📄 [TaskList.jsx](frontend/src/components/TaskList.jsx)
    - 📂 **pages**
      - 📄 [CreateTask.jsx](frontend/src/pages/CreateTask.jsx)
      - 📄 [EditTask.jsx](frontend/src/pages/EditTask.jsx)
      - 📄 [Home.jsx](frontend/src/pages/Home.jsx)
      - 📄 [ViewTask.jsx](frontend/src/pages/ViewTask.jsx)
    - 📂 **utils**
      - 📄 [api.jsx](frontend/src/utils/api.jsx)
    - 📄 [App.jsx](frontend/src/App.jsx)
    - 📄 [index.css](frontend/src/index.css)
    - 📄 [main.jsx](frontend/src/main.jsx)
  - 📄 [index.html](frontend/index.html)
  - 📄 [package\-lock.json](frontend/package-lock.json)
  - 📄 [package.json](frontend/package.json)
  - 📄 [postcss.config.js](frontend/postcss.config.js)
  - 📄 [README.md](README.md)
  - 📄 [tailwind.config.js](frontend/tailwind.config.js)
  - 📄 [vite.config.js](frontend/vite.config.js)

## Architectural Design

The frontend follows a modular architecture, with components organized into separate folders. Formik is used for form management, React Query for data fetching.

## Features Implemented

1. **Task List Page**:

   - Displays a list of all tasks with their title, status, and due date.
   - Provides buttons for editing and deleting each task.
   - Includes a button to create a new task.

2. **Task Form Page**:
   - Form for creating and editing tasks with fields: Title, Description, Status, and Due Date.
   - Used for both creating a new task and updating an existing task.

## Installation and Setup

1. Change directory to frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm run dev
   ```
