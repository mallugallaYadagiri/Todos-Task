import React, { useState, useEffect } from "react";
import "../Components/TodosPage.css";
import axios from "axios";
import { MdEditSquare, MdDelete } from "react-icons/md";

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterTasks, setFilterTasks] = useState("All");

  let API_URL = "https://jsonplaceholder.typicode.com/users/1/todos";
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [API_URL]);

  const addTodo = () => {
    if (newTask.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        title: newTask,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setNewTask("");
    }
  };
  const editTodo = (id) => {
    const taskToEdit = todos.find((todo) => todo.id === id);
    if (taskToEdit) {
      setNewTask(taskToEdit.title);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterTasks === "All") {
      return true;
    } else if (filterTasks === "Completed") {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  });

  const toggleTodo = (taskId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === taskId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  return (
    <div>
      <div className="input-container">
        <input
          className="input-box"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter the task ...."
        />

        <button type="button" className="add-btn" onClick={addTodo}>
          Add Task
        </button>
      </div>
      <div className="toggle">
        <button onClick={() => setFilterTasks("Completed")}>Completed</button>
        <button onClick={() => setFilterTasks("Incomplete")}>Incomplete</button>
        <button onClick={() => setFilterTasks("All")}>Show All</button>
      </div>
      <div>
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`task-container ${
              todo.completed ? "completed-task" : "incomplete-task"
            }`}
            onClick={() => toggleTodo(todo.id)}
          >
            <p className="task">{todo.title}</p>
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
