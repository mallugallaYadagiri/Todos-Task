import React, { useState, useEffect } from "react";
import "../Components/TodosPage.css";
import axios from "axios";
import { MdEditSquare, MdDelete } from "react-icons/md";

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterTasks, setFilterTasks] = useState("All");
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [loading, setLoading] = useState(true);

  let API_URL = "https://jsonplaceholder.typicode.com/users/1/todos";
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [API_URL]);

  const addTodo = () => {
    if (newTask.trim() !== "") {
      if (editMode) {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === editTodoId) {
            return { ...todo, title: newTask };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setEditMode(false);
        setEditTodoId(null);
      } else {
        const newTodo = {
          id: todos.length + 1,
          title: newTask,
          completed: false,
        };
        setTodos([newTodo, ...todos]);
      }
      setNewTask("");
      setErrorMessage("");
    } else {
      setErrorMessage("The task name should not be empty.");
    }
  };

  const editTodo = (id) => {
    const taskToEdit = todos.find((todo) => todo.id === id);
    if (taskToEdit) {
      setNewTask(taskToEdit.title);
      setEditMode(true);
      setEditTodoId(id);
    }
  };

  const toggleCompleteStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    console.log("Deleting todo with id:", id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    console.log("Updated Todos:", updatedTodos);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterTasks === "All") {
      return true;
    } else if (filterTasks === "Completed") {
      return todo.completed;
    } else if (filterTasks === "Incomplete") {
      return !todo.completed;
    }
    return true;
  });

  return (
    <div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="input-container">
        <input
          className="input-box"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter the task ...."
        />

        <button type="button" className="add-btn" onClick={addTodo}>
          {editMode ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="toggle">
        <button onClick={() => setFilterTasks("Completed")}>Completed</button>
        <button onClick={() => setFilterTasks("Incomplete")}>Incomplete</button>
        <button onClick={() => setFilterTasks("All")}>Show All</button>
      </div>
      {loading && <h2 className="loading-message">Loading tasks...</h2>}
      <div>
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`task-container ${
              todo.completed ? "completed-task" : "incomplete-task"
            }`}
          >
            <p
              className={`task ${todo.completed ? "completed-task" : ""}`}
              onClick={() => toggleCompleteStatus(todo.id)}
            >
              {todo.completed ? <del>{todo.title}</del> : todo.title}
            </p>

            <div className="icons ">
              <MdEditSquare
                size={25}
                color="#394466"
                onClick={() => editTodo(todo.id)}
              />
              <MdDelete
                size={25}
                color="#394466"
                onClick={() => deleteTodo(todo.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodosPage;
