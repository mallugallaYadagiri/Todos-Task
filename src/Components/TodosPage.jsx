import React, { useState, useEffect } from "react";
import "../Components/TodosPage.css";
import axios from "axios";

function TodosPage() {
  const [todos, setTodos] = useState([]);

  let URL = "https://jsonplaceholder.typicode.com/users/1/todos";
  useEffect(() => {
    axios.get(URL).then((response) => {
      console.log(response.data);
      setTodos(response.data);
    });
  }, []);

  return (
    <div>
      <div>
        <input />
        <button>Add Task</button>
      </div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <p
              style={
                todo.completed
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" }
              }
            >
              {todo.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodosPage;
