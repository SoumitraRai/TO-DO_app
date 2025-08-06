# TO-DO App

A full-stack to-do application with a Python Flask backend and React.js frontend.

## Overview

This project is a task management application that allows users to create, read, update, and delete to-do items. The application consists of:
- A **Python Flask backend** that provides a RESTful API
- A **React.js frontend** for an interactive user interface
- SQLite database for data storage

## Features

- Create new to-do tasks
- Mark tasks as complete/incomplete
- Edit task details
- Delete tasks
- Filter tasks by status
- Simple and intuitive user interface

## Project Structure

```
TO-DO_app/
├── todo.py            # Main Flask application
├── requirements.txt   # Python dependencies
├── instance/          # Contains the SQLite database
├── __pycache__/       # Python compiled files
│
└── todo-frontend/     # React frontend application
    ├── public/        # Static files
    ├── src/           # React source code
    ├── build/         # Production build
    └── package.json   # Node.js dependencies
```

## Backend Setup

1. **Create a virtual environment and activate it**
   ```
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```
   pip install -r requirements.txt
   ```

3. **Run the Flask application**
   ```
   flask run --debug
   ```
   The backend API will be available at http://localhost:5000

## Frontend Setup

1. **Navigate to the frontend directory**
   ```
   cd todo-frontend
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Start the development server**
   ```
   npm start
   ```
   The frontend will be available at http://localhost:3000

## API Endpoints

- `GET /todos` - Get all to-do items
- `POST /todos` - Create a new to-do item
- `PUT /todos/<id>` - Update a to-do item
- `DELETE /todos/<id>` - Delete a to-do item

## Technologies Used

### Backend
- Python
- Flask
- SQLite

### Frontend
- React.js
- CSS
- Fetch API for HTTP requests

## Deployment

The application can be deployed as:
- Backend on any WSGI-compatible server
- Frontend as static files on any web server
- Or as a combined application on platforms like Heroku or Vercel

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
