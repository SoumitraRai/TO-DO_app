import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:5000/todos';

function App() {
  // Our todo list and inputs
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // For loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch todos when the app loads
  useEffect(() => {
    getTodos();
  }, []);

  // Get all todos from the backend
  async function getTodos() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch {
      setError('Could not fetch your todos. Try again!');
    }
    setLoading(false);
  }

  // Add a new todo
  async function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title cannot be empty.');
      return;
    }
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      const todo = await res.json();
      setTodos([...todos, todo]);
      setTitle('');
      setDescription('');
    } catch {
      setError('Could not add todo.');
    }
  }

  // Toggle completion status
  async function toggleComplete(todo) {
    try {
      await fetch(`${API_URL}/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...todo, completed: !todo.completed }),
      });
      setTodos(todos.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      ));
    } catch {
      setError('Could not update todo.');
    }
  }

  // Delete a todo
  async function deleteTodo(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(t => t.id !== id));
    } catch {
      setError('Could not delete todo.');
    }
  }

  return (
    <div className="container mt-5" style={{maxWidth: 500}}>
      <h1 className="text-center mb-4">📝 My Todo List</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Add Todo Form */}
      <div className="card mb-4">
        <div className="card-header">Add something to do</div>
        <div className="card-body">
          <form onSubmit={addTodo}>
            <input
              className="form-control mb-2"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <textarea
              className="form-control mb-2"
              placeholder="Description (optional)"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <button className="btn btn-primary w-100">Add</button>
          </form>
        </div>
      </div>
      {/* Todo List */}
      <div className="card">
        <div className="card-header">Things to do</div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : todos.length === 0 ? (
            <div className="text-center text-muted">No todos yet. Add one above!</div>
          ) : (
            <ul className="list-group">
              {todos.map(todo => (
                <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo)}
                      title="Done?"
                    />
                    <span className={todo.completed ? "text-decoration-line-through" : ""}>
                      <strong>{todo.title}</strong>
                    </span>
                    {todo.description && (
                      <div className="text-muted small">{todo.description}</div>
                    )}
                    <div className="text-muted small">
                      {todo.created_at && <>Created: {new Date(todo.created_at).toLocaleString()}</>}
                      {todo.updated_at && todo.updated_at !== todo.created_at &&
                        <> • Updated: {new Date(todo.updated_at).toLocaleString()}</>
                      }
                    </div>
                  </div>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <footer className="text-center text-muted mt-4" style={{fontSize: '0.9em'}}>
        <span>Made with ❤️ by you</span>
      </footer>
    </div>
  );
}

export default App;