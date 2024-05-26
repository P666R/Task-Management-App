# Task Management App (Backend)

#### (For Task Management App Frontend details and setup, please refer the [Frontend README](frontend/README.md).)

## Project Description

Task Management App backend implements an API designed to handle tasks efficiently. It allows users to create, read, update, and delete tasks with fields such as title, description, status, and due date. The API is built with Node.js, Express, and Redis, ensuring good performance, high data integrity and security, robust error handling, extensive logging for debugging and real-time data handling.

## Tech Stack

### Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: A web application framework for Node.js, selected for its simplicity and flexibility in building RESTful APIs.
- **Redis**: An in-memory data structure store, used for its speed and ability to handle real-time data with ease.
- **Express Validator**: Middleware for Express for validating and sanitizing requests, ensuring data integrity and security.
- **Winston**: Logging library for Node.js, used for centralized logging.

## Design Considerations

- **Separation of Concerns**: Each layer (controller, service, repository) has a distinct responsibility, making the codebase more maintainable.
- **Modular Code**: Code is organized into modules, promoting reusability and ease of understanding.

## Architecture Overview

The architecture follows a layered design pattern, consisting of:

1. **Controller Layer**: Handles incoming HTTP requests and sends responses.
2. **Service Layer**: Contains business logic and orchestrates operations between controllers and repositories.
3. **Repository Layer**: Manages data access and persistence.

## Folder Structure

- 📂 **backend**
  - 📂 **config**
    - 📄 [redis.js](backend/config/redis.js)
  - 📂 **constants**
    - 📄 [index.js](backend/constants/index.js)
  - 📂 **controllers**
    - 📄 [taskController.js](backend/controllers/taskController.js)
  - 📂 **logs**
    - 📄 [combined\-2024\-05\-26.log](backend/logs/combined-2024-05-26.log)
    - 📄 [error.log](backend/logs/error.log)
    - 📄 [exception.log](backend/logs/exception.log)
    - 📄 [rejections.log](backend/logs/rejections.log)
  - 📂 **middleware**
    - 📄 [errorMiddleware.js](backend/middleware/errorMiddleware.js)
  - 📂 **models**
    - 📄 [Task.js](backend/models/Task.js)
  - 📂 **repositories**
    - 📄 [taskRepository.js](backend/repositories/taskRepository.js)
  - 📂 **routes**
    - 📄 [taskRoutes.js](backend/routes/taskRoutes.js)
  - 📂 **services**
    - 📄 [taskService.js](backend/services/taskService.js)
  - 📂 **utils**
    - 📄 [BadRequestError.js](backend/utils/BadRequestError.js)
    - 📄 [InternalServerError.js](backend/utils/InternalServerError.js)
    - 📄 [NotFoundError.js](backend/utils/NotFoundError.js)
    - 📄 [logger.js](backend/utils/logger.js)
    - 📄 [validate.js](backend/utils/validate.js)
  - 📄 [app.js](backend/app.js)
  - 📄 [server.js](backend/server.js)
- 📄 [README.md](README.md)
- 📄 [package\-lock.json](package-lock.json)
- 📄 [package.json](package.json)

## Features Implemented

- **Global Error Handling**: Centralized error handling mechanism ensuring consistent error responses.
- **Request Validation**: Using Express Validator to validate and sanitize incoming requests, ensuring data integrity.
- **Repository Validations**: Ensuring that data stored in Redis adheres to the required schema and constraints.
- **Logging**: Integrated with Winston and Morgan for logging HTTP requests and system events. Separate log files are maintained for general logs, errors, exceptions, and rejections.

## API Routes

### Task Routes

- **GET api/v1/tasks**: Retrieve all tasks.
- **GET api/v1/tasks/:id**: Retrieve a single task by ID.
- **POST api/v1/tasks**: Create a new task.
- **PUT api/v1/tasks/:id**: Update an existing task.
- **DELETE api/v1/tasks/:id**: Delete a task.

### Usage

#### Example Request

```bash
POST http://localhost:3000/api/tasks
-H "Content-Type: application/json"
-B '{
  "title": "New Task",
  "description": "Description of the task",
  "status": "pending",
  "dueDate": "2024-06-01"
}'
```

## Installation and Setup

### Prerequisites

- Node.js (>=20.x)
- Redis server installed locally

### Steps

1. **Clone the Repository and Install Dependencies for backend (at root)**:

   ```bash
   git clone https://github.com/P666R/Task-Management-App.git
   cd Task-Management-App
   npm install
   ```

2. **Set Up Environment Variables**:
   - Create a .env file in the root directory with the following content:
   ```bash
   NODE_ENV=development
   PORT=3000
   ```
3. **Set Up Redis locally on WSL2 (Windows)**:
   - Then start Redis Server:
   ```bash
   sudo service redis-server start
   ```
   - Check Redis Status:
   ```bash
   sudo service redis-server status
   ```
   - Test Redis:
   ```bash
   redis-cli
   127.0.0.1:6379>ping
   returns pong
   ```
4. **Start the backend server**:
   ```bash
   npm run dev
   ```

## Please refer the [Frontend README](frontend/README.md) for details and instructions on how to install and run the frontend.
